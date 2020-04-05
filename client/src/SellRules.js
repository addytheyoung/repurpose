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
      bookModal: false,
      opening: null,
      id: null,
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
            const id = data.docs[i].id;
            allDates = allDates.concat({ dates: dates, collector: id });
          }
          if (i === data.docs.length - 1) {
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
      for (const opening in sunday.dates) {
        openingArr.push({
          dates: sunday.dates[opening][0],
          id: sunday.collector,
        });
      }
    }

    return (
      <div>
        {this.state.bookModal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              onClick={(e) => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "fixed",
              }}
            ></div>

            <div
              style={{
                width: "30vw",
                borderRadius: 5,
                height: "40vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "fixed",
                zIndex: 100,
                opacity: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div style={{ fontWeight: 400, fontSize: 20, marginTop: 10 }}>
                The Collector will pick up your items at
              </div>
              <div style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
                {this.state.opening[0]}
              </div>
              <div style={{ fontWeight: 400, fontSize: 20, marginTop: 30 }}>
                and leave around
              </div>
              <div style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
                {this.state.opening[1]}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <div
                  onClick={() =>
                    this.setState({
                      bookModal: null,
                      opening: null,
                    })
                  }
                  id="book"
                  style={{
                    padding: 10,
                    backgroundColor: "gray",
                    borderRadius: 5,
                    textAlign: "center",
                    fontWeight: 600,
                    marginRight: 10,
                    color: "white",
                  }}
                >
                  CANCEL
                </div>
                <div
                  onClick={() => this.bookModal()}
                  id="book"
                  style={{
                    padding: 10,
                    backgroundColor: "green",
                    borderRadius: 5,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  ACCEPT
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <HeaderBar />
        </div>
        <div style={{ marginLeft: 20, marginTop: 20 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 24,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Pick a time that works best for you.
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Calendar onClickDay={(e) => this.seeTimes(e)} />
            </div>
            {this.state.currentDate && (
              <div
                style={{
                  width: 300,
                  height: 400,
                  overflowY: "scroll",
                  borderRadius: 5,
                  backgroundColor: "#f1f1f1",
                  marginLeft: 50,
                }}
              >
                {openingArr.map((opening) => {
                  const id = opening.id;

                  const collectorStartHours = opening.dates[0].substring(0, 2);
                  const collectorStartMinutes = opening.dates[0].substring(
                    3,
                    5
                  );
                  const collectorStartTime = opening.dates[0].substring(6, 8);
                  const collectorEndHours = opening.dates[1].substring(0, 2);
                  const collectorEndMinutes = opening.dates[1].substring(3, 5);
                  const collectorEndTime = opening.dates[1].substring(6, 8);

                  return (
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {opening.dates[0]} - {opening.dates[1]}
                        </div>
                        <div
                          onClick={() => this.showBookModal(opening.dates, id)}
                          id={"book"}
                          style={{
                            padding: 10,
                            backgroundColor: "green",
                            borderRadius: 5,
                            textAlign: "center",
                            fontWeight: 600,
                            color: "white",
                          }}
                        >
                          BOOK
                        </div>
                      </div>
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

  bookModal() {
    firebase
      .firestore()
      .collection("Collectors")
      .doc(this.state.id.toString())
      .get()
      .then((data) => {
        var bookings = data.data().bookings;
        bookings.push({
          start: this.state.opening[0],
          end: this.state.opening[1],
          day: this.state.currentDate.toString(),
        });
        firebase
          .firestore()
          .collection("Collectors")
          .doc(this.state.id.toString())
          .update({
            bookings: bookings,
          })
          .then(() => {
            this.setState({
              opening: null,
              bookModal: false,
            });
            alert("Book successful!");
            window.location.href = "/";
          });
      });
  }

  closeModal() {
    this.setState({
      bookModal: false,
    });
  }

  showBookModal(opening, id) {
    this.setState({
      bookModal: true,
      opening: opening,
      id: id,
    });
  }

  seeTimes(e) {
    this.setState({
      currentDate: e,
    });
  }
}
