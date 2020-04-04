import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/SellRules.css";
import ClipLoader from "react-spinners/ClipLoader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import * as firebase from "firebase";
import "react-calendar/dist/Calendar.css";

export default class SellRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentDate: null,
      dates: [],
    };
    firebase
      .firestore()
      .collection("Collectors")
      .where("city", "==", localStorage.getItem("city"))
      .get()
      .then((data) => {
        var allDates = [];
        if (data.docs.length === 0) {
          this.setState({
            loaded: true,
          });
        }
        for (var i = 0; i < data.docs.length; i++) {
          const collector = data.docs[i].data();
          if (collector.accepted) {
            const dates = collector.dates;
            allDates = allDates.concat(dates);
          }
          if (i === data.docs.length - 1) {
            console.log(allDates);
            this.setState({
              dates: allDates,
              loaded: true,
            });
          }
        }
      });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "absolute",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }

    // This is the day the user clicked on the calendar
    var day = null;
    var month = null;
    var year = null;
    var hours = null;
    var minutes = null;
    var realDay = null;
    var openingArr = [];
    if (this.state.currentDate) {
      day = this.state.currentDate.getDate();
      realDay = this.state.currentDate.getDay();
      month = this.state.currentDate.getMonth();
      year = this.state.currentDate.getFullYear();
      hours = this.state.currentDate.getHours();
      minutes = this.state.currentDate.getMinutes();

      const sunday = this.state.dates[realDay];

      // Looping through each opening on the day
      // Put these times on the screen
      for (const opening in sunday) {
        openingArr.push(sunday[opening]);
      }
    }

    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div style={{ marginLeft: 20, marginTop: 20 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Calendar onClickDay={(e) => this.seeTimes(e)} />
            </div>
            {this.state.currentDate && (
              <div
                style={{
                  width: 200,
                  height: 300,
                  backgroundColor: "#f1f1f1",
                  marginLeft: 50,
                }}
              >
                {/* {this.state.currentDate.toString()} */}
                {openingArr.map((opening) => {
                  return (
                    <div>
                      {opening[0]} - {opening[1]}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  seeTimes(e) {
    this.setState({
      currentDate: e,
    });
  }
}
