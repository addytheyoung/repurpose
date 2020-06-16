import React from "react";
import Calendar from "react-calendar";
import * as firebase from "firebase";
import { Button, Modal } from "@material-ui/core";
import "react-calendar/dist/Calendar.css";
import api from "./api";
import "./css/ScheduleTime.css";

export default class ScheduleTime extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Collectors")
      .doc("andrewtateyoung")
      .get()
      .then((myTimeDocs) => {
        const myTime = myTimeDocs.data();
        firebase
          .firestore()
          .collection("Users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((userData) => {
            this.setState({
              loaded: true,
              allOpenTimes: myTime,
              userData: userData.data(),
            });
          });
      });

    this.state = {
      loaded: false,
      activeDay: null,
      allOpenTimes: null,
      timeSelected: false,
    };
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    var openTimesToday = null;
    var dateS = null;
    if (this.state.activeDay) {
      const activeDay = this.state.activeDay;
      const day = activeDay.getDate();
      const month = activeDay.getMonth();
      const year = activeDay.getFullYear();
      dateS = parseInt(month) + 1 + "-" + day + "-" + year;
      openTimesToday = this.state.allOpenTimes[dateS];
    }
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Modal
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={this.state.timeSelected}
            onClose={() =>
              this.setState({
                timeSelected: null,
              })
            }
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "40vw",
                height: "50vh",
                backgroundColor: "#ffffff",
              }}
            >
              <div>
                {"Well show up around " +
                  this.state.timeSelected +
                  " on " +
                  dateS +
                  "."}
              </div>
              <div> Does this work?</div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  onClick={() =>
                    this.setState({
                      timeSelected: null,
                    })
                  }
                >
                  NO
                </Button>
                <Button onClick={() => this.submit()}>YES</Button>
              </div>
            </div>
          </Modal>
          <div>What time should we show up? (3/3)</div>
          <div style={{ marginTop: 30 }}>
            <Calendar
              maxDate={new Date(2020, 10, 0)}
              minDate={new Date()}
              onClickDay={(e) => this.seeTimes(e)}
            />
          </div>
          {this.state.activeDay && (
            <div
              style={{
                width: "50vw",
                height: 300,
                marginTop: 10,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {openTimesToday &&
                openTimesToday.map((time, index) => {
                  return (
                    <div
                      id="open-times"
                      onClick={() =>
                        this.setState({
                          timeSelected: time,
                        })
                      }
                      style={{
                        width: 70,
                        marginLeft: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 3,
                        height: 40,
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "#e1e1e1",
                      }}
                    >
                      {time}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    );
  }

  submit() {
    const time = this.state.timeSelected;
    const activeDay = this.state.activeDay;
    this.setState({
      activeDay: null,
      timeSelected: null,
    });
    const day = activeDay.getDate();
    const month = activeDay.getMonth();
    const year = activeDay.getFullYear();
    const dateS = parseInt(month) + 1 + "-" + day + "-" + year;
    const openTimesToday = this.state.allOpenTimes[dateS];
    const newOpenTimesToday = [];
    for (var i = 0; i < openTimesToday.length; i++) {
      if (openTimesToday[i] != time) {
        newOpenTimesToday.push(openTimesToday[i]);
      }
    }

    api.sendEmail(
      this.state.userData.email,
      "We'll see you at " +
        time +
        " on " +
        dateS +
        "!\n\n" +
        "Call 903-203-1286 if you have any problems or concerns."
    );
    api.sendEmail(
      "andrew@collection.deals",
      "We'll see you at " +
        time +
        " on " +
        dateS +
        "!\n\n" +
        "Call 903-203-1286 if you have any problems or concerns."
    );
    firebase
      .firestore()
      .collection("Collectors")
      .doc("andrewtateyoung")
      .update({
        [dateS]: newOpenTimesToday,
      })
      .then(() => {
        alert("An Email has been sent to you. See you soon!");
        window.location.href = "/";
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  seeTimes(e) {
    this.setState({
      activeDay: e,
    });
  }
}
