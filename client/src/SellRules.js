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
import api from "./api";
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
      pickup: null,
      calendar: null,
    };
    if (
      !localStorage.getItem("name") ||
      !localStorage.getItem("phone") ||
      !localStorage.getItem("address1")
    ) {
      window.location.href = "/sell/kit";
    }

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
            const dates = collector.may[0];
            const may = collector.may[0];
            const june = collector.june[0];
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
    if (!this.state.calendar) {
      return (
        <div>
          <div>
            <HeaderBar />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginTop: 20,
              }}
            >
              How do we get the items?
            </div>

            <div
              onClick={() => this.setPickup(1)}
              id="one"
              style={{
                width: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderColor: this.state.pickup === 1 ? "blueviolet" : "grey",
                flexDirection: "column",
                marginTop: 50,
                height: 50,
                padding: 10,
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: 5,
              }}
            >
              <div style={{ fontSize: 18 }}>I'll leave everything outside</div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                40% commission. You don't need to be present
              </div>
            </div>

            <div
              onClick={() => this.setPickup(3)}
              id="three"
              style={{
                width: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 50,
                height: 50,
                padding: 10,
                borderColor: this.state.pickup === 3 ? "blueviolet" : "grey",
                borderWidth: 2,
                borderStyle: "solid",
                borderRadius: 5,
              }}
            >
              <div style={{ fontSize: 18 }}>
                I'll show you where the clutter is
              </div>
              <div style={{ fontSize: 12, marginTop: 5 }}>
                30% commission. You must be present
              </div>
            </div>
            {this.state.pickup && (
              <div
                id="button"
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "#f1f1f1",
                  textAlign: "center",
                  fontWeight: 600,
                  marginTop: 30,
                }}
                onClick={() =>
                  this.setState({
                    calendar: true,
                  })
                }
              >
                NEXT
              </div>
            )}
          </div>
        </div>
      );
    }
    if (this.state.currentDate) {
      day = this.state.currentDate.getDate();
      realDay = this.state.currentDate.getDay();
      month = this.state.currentDate.getMonth();
      year = this.state.currentDate.getFullYear();
      hours = this.state.currentDate.getHours();
      minutes = this.state.currentDate.getMinutes();

      // Looping through each opening on the day
      // Put these times on the screen

      for (var i = 0; i <= 31; i++) {
        const opening = this.state.dates[0].dates[i];
        const tempArr = [];
        for (const openingDay in this.state.dates[0].dates[opening]) {
          tempArr.push(this.state.dates[0].dates[opening][openingDay]);
        }
        openingArr.push({
          day: opening,
          date: tempArr,
          id: this.state.dates[0].collector,
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
                {this.state.opening}
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
              <Calendar
                maxDate={new Date(2020, 5, 0)}
                minDate={new Date()}
                onClickDay={(e) => this.seeTimes(e)}
              />
            </div>

            {this.state.currentDate && (
              <div
                style={{
                  width: 300,

                  overflowY: "scroll",
                  borderRadius: 5,
                  backgroundColor: "#f1f1f1",
                  marginLeft: 50,
                }}
              >
                {openingArr[day].day.map((opening) => {
                  const id = openingArr[day].id;
                  console.log(id);
                  const date = openingArr[day].day;

                  // const collectorStartHours = opening.dates[0].substring(0, 2);
                  // const collectorStartMinutes = opening.dates[0].substring(
                  //   3,
                  //   5
                  // );
                  // const collectorStartTime = opening.dates[0].substring(6, 8);
                  // const collectorEndHours = opening.dates[1].substring(0, 2);
                  // const collectorEndMinutes = opening.dates[1].substring(3, 5);
                  // const collectorEndTime = opening.dates[1].substring(6, 8);

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
                          {opening}
                        </div>
                        <div
                          onClick={() => this.showBookModal(opening, id)}
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
          <div
            id="button"
            style={{
              padding: 10,
              width: 50,
              borderRadius: 5,
              backgroundColor: "#f1f1f1",
              textAlign: "center",
              fontWeight: 600,
              marginTop: 30,
            }}
            onClick={() =>
              this.setState({
                calendar: false,
              })
            }
          >
            Back
          </div>
        </div>
      </div>
    );
  }

  add30Minutes(opening) {
    const number = opening.substring(0, 5);
    const time = opening.substring(6, 8);

    if (opening === "09:30 AM") {
      return "10:00 AM";
    }
    if (opening === "10:30 AM") {
      return "11:00 AM";
    } else if (opening === "11:30 AM") {
      return "12:00 PM";
    } else if (opening === "12:30 PM") {
      return "01:00 PM";
    }

    if (number[3] === "0") {
      // Just add 30 minuets
      var newNumber = "";
      for (var i = 0; i < number.length; i++) {
        if (i === 3) {
          newNumber += "3";
        } else {
          newNumber += number[i];
        }
      }
      newNumber += " " + time;
    } else {
      // We have to change the hour as well
      var newNumber = "";
      const num = parseInt(number.substring(0, 2)) + 1;
      for (var i = 0; i < number.length; i++) {
        if (i == 1) {
          newNumber += num;
        } else if (i == 3) {
          newNumber += "0";
        } else {
          newNumber += number[i];
        }
      }
      newNumber += " " + time;
    }
    return newNumber;
  }

  bookModal() {
    this.setState({
      loaded: false,
    });

    firebase
      .firestore()
      .collection("Collectors")
      .doc(this.state.id.toString())
      .get()
      .then((data) => {
        const oldMay = data.data().may;
        const day = this.state.currentDate.getDate();
        var value = -1;
        for (var i = 0; i < oldMay[0][day].length; i++) {
          if (oldMay[0][day][i] === this.state.opening) {
            value = i;
            break;
          }
        }
        if (value === -1) {
          alert("Date taken!");
          return;
        }
        oldMay[0][day].splice(value, 1);
        var bookings = data.data().bookings;

        bookings.push({
          type: this.state.pickup,
          email: localStorage.getItem("email"),
          address1: localStorage.getItem("address1"),
          address2: localStorage.getItem("address2"),
          start: this.state.opening,
          pay_type: localStorage.getItem("sell_type"),
          day: this.state.currentDate.toString(),
          seller: localStorage.getItem("stripe_user_id"),
        });
        firebase
          .firestore()
          .collection("Collectors")
          .doc(this.state.id.toString())
          .update({
            bookings: bookings,
            may: oldMay,
          })
          .then(() => {
            firebase
              .firestore()
              .collection("Users")
              .doc(firebase.auth().currentUser.uid)
              .get()
              .then((me) => {
                const email = me.data().email;
                const month = this.state.currentDate.getMonth() + 1;
                this.setState({
                  bookModal: false,
                  loaded: true,
                });

                api.sendEmail(
                  email,
                  "An " +
                    localStorage.getItem("city") +
                    " Collector will come to " +
                    localStorage.getItem("address1") +
                    " at " +
                    this.state.opening +
                    " on " +
                    month +
                    "/" +
                    this.state.currentDate.getDate() +
                    "/" +
                    this.state.currentDate.getFullYear() +
                    " to pick up your items.\n\nPlease reply to this email, or call 903-203-1286 if you have any questions!\n\n\n-Andrew, founder of Collection"
                );
                api.sendEmail(
                  "andrew@collection.deals",
                  "An " +
                    localStorage.getItem("city") +
                    " Collector will come to " +
                    localStorage.getItem("address1") +
                    " at " +
                    this.state.opening +
                    " on " +
                    month +
                    "/" +
                    this.state.currentDate.getDate() +
                    "/" +
                    this.state.currentDate.getFullYear() +
                    " to pick up your items.\n\nPlease reply to this email, or call 903-203-1286 if you have any questions!\n\n\n-Andrew, founder of Collection"
                );
                alert("Success! Email will be sent confirming details.");
                window.location.href = "/";
              });
          });
      });
  }

  setPickup(type) {
    this.setState({
      pickup: type,
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
