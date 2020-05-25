import React from "react";
import HeaderBar from "./HeaderBar";
import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import api from "./api";
import { Input } from "@material-ui/core";
import * as firebase from "firebase";
import "./css/Sell_2.css";
import Star from "./images/shapes-and-symbols (2).svg";
import Calendar from "react-calendar";
import Close from "./images/close.png";
import AndrewMap from "./AndrewMap";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default class Sell_2 extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("city") || localStorage.getItem("city") == "") {
      localStorage.setItem("city", "Austin, TX");
    }
    const today = new Date();
    this.state = {
      markers: [],
      allMarkers: [],
      collectorArray: [],
      loaded: false,
      today: today,
      modal: false,
      sellModal: false,
      question: 1,
      currentDates: false,
      currentSelectedTime: false,
      mounted: true,
    };

    firebase
      .firestore()
      .collection("Collectors")
      .where("collection_city", "==", localStorage.getItem("city"))
      .get()
      .then((collectorDocs) => {
        const collectorArray = [];
        const markerArray = [];
        for (var i = 0; i < collectorDocs.docs.length; i++) {
          const collectorData = collectorDocs.docs[i].data();

          if (collectorData.type == "dropoff") {
            collectorArray.push(collectorData);
            markerArray.push({
              lat: collectorData.lat,
              lng: collectorData.lng,
            });
          }
        }
        collectorArray.reverse();
        this.setState({
          loaded: true,
          collectorArray: collectorArray,
          markers: markerArray,
          allMarkers: markerArray,
        });
      });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    localStorage.setItem("city", "Austin, TX");
    var MapWithASearchBox = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100% ` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {};
          this.setState({
            bounds: null,
            center: {
              lat: 30.2672,
              lng: -97.7431,
            },
            markers: [],
            mounted: false,
            hoverOverThing: (lat, lng) => {
              if (!this.state.allMarkers || !this.state.markers) {
                return null;
              }
              const temp = [];
              for (var i = 0; i < this.state.allMarkers.length; i++) {
                const marker = this.state.allMarkers[i];
                if (marker.lat == lat && marker.lng == lng) {
                  temp.push(marker);
                }
              }
              this.setState({
                markers: temp,
              });
            },
            leaveOverThing: (lat, lng) => {
              if (!this.state.allMarkers || !this.state.markers) {
                return null;
              }
              this.setState({
                markers: this.state.allMarkers,
              });
            },
            onMapMounted: (ref) => {
              if (!this.state.mounted) {
                refs.map = ref;
                const markerArray = [];
                firebase
                  .firestore()
                  .collection("Collectors")
                  .where("collection_city", "==", localStorage.getItem("city"))
                  .get()
                  .then((collectorDocs) => {
                    var i_index = 0;
                    for (var i = 0; i < collectorDocs.docs.length; i++) {
                      const collectorData = collectorDocs.docs[i].data();
                      if (collectorData.type == "dropoff") {
                        api
                          .getLatLng(
                            collectorData.house_address,
                            collectorData.zip,
                            collectorData.city,
                            collectorData.state
                          )
                          .then((result) => {
                            i_index++;
                            const position =
                              result.results[0].geometry.location;
                            markerArray.push(position);
                            if (i_index == collectorDocs.docs.length) {
                              console.log(markerArray);
                              this.setState({
                                markers: markerArray,
                                allMarkers: markerArray,
                                mounted: true,
                              });
                            }
                          });
                      } else {
                        i_index++;
                      }
                    }
                  });
              }
            },
            onBoundsChanged: () => {
              this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
              });
            },
            onSearchBoxMounted: (ref) => {
              refs.searchBox = ref;
            },
          });
        },
      }),
      withScriptjs,
      withGoogleMap
    )((props) => (
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={11}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
      >
        {(this.state.x = props.hoverOverThing)}
        {(this.state.y = props.leaveOverThing)}

        {props.markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    ));

    return (
      <div style={{ minHeight: "100vh" }}>
        {this.state.modal && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={(e) => this.closeModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50vw",
                borderRadius: 5,
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                alignItems: "center",
                position: "absolute",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  id="close"
                  onClick={() => this.closeModal()}
                  src={Close}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 20,
                    marginRight: 20,
                  }}
                />
              </div>
              <div style={{ marginTop: 20, fontSize: 20 }}>
                {this.state.modal.name + " " + "is the Collector!"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 50,
                    marginRight: 10,
                  }}
                >
                  <img
                    src={this.state.modal.house_picture}
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 50,
                    marginLeft: 10,
                  }}
                >
                  <img
                    src={this.state.modal.collector_picture}
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 100,
                  width: "50%",
                }}
              >
                {this.state.modal.description}
              </div>
              <div style={{ marginTop: 30, fontSize: 20 }}>
                {this.state.modal.house_address}
              </div>
              <div
                onClick={(e) => this.sellHere(e, this.state.modal, true)}
                id="sell-here"
                style={{
                  zIndex: 99,
                  marginTop: 20,
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: "#E61E4D",
                  width: 150,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                SELL HERE
              </div>
            </div>
          </div>
        )}
        {this.state.sellModal && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={(e) => this.closeSellModal(e)}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "absolute",
              }}
            ></div>

            {this.state.question == 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50vw",
                  borderRadius: 5,
                  height: "80vh",
                  top: 30,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 100,
                  opacity: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    id="close"
                    onClick={(e) => this.closeSellModal(e)}
                    src={Close}
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 20,
                      marginRight: 20,
                    }}
                  />
                </div>
                <img
                  style={{ marginTop: 30 }}
                  src="https://cf-assets-tup.thredup.com/pwa/cashout/providers/logos/paypal.jpg"
                />
                <div style={{ marginTop: 40, fontSize: 20 }}>
                  PayPal Account Email
                </div>
                <div style={{ marginTop: 10, fontSize: 12 }}>
                  This is how we pay you
                </div>
                <Input
                  id="email1"
                  placeholder="Email"
                  style={{ height: 50, width: 250, marginTop: 10 }}
                />
                <Input
                  id="email2"
                  placeholder="Confirm Email"
                  style={{ height: 60, width: 250, marginTop: 10 }}
                />

                <div
                  id="continue"
                  onClick={(e) => this.continue()}
                  style={{
                    zIndex: 99,
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: "#E61E4D",
                    width: 150,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: 600,
                  }}
                >
                  CONTINUE
                </div>
              </div>
            )}
            {this.state.question == 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50vw",
                  borderRadius: 5,
                  height: "80vh",
                  top: 30,
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 100,
                  opacity: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    id="close"
                    onClick={(e) => this.closeSellModal(e)}
                    src={Close}
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 20,
                      marginRight: 20,
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginBottom: 20, fontWeight: 600 }}>
                    Roughly, when do you want to dropoff? <br />
                    Dropoff takes about 10 minutes!
                  </div>
                  <Calendar
                    maxDate={new Date(2020, 5, 0)}
                    minDate={new Date()}
                    onClickDay={(e) => this.seeTimes(e, this.state.sellModal)}
                  />
                </div>
                {this.state.currentDates && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: 20,
                      width: 606,
                      marginBottom: 20,
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    {this.state.currentDates.map((date) => {
                      return (
                        <div
                          onClick={() => this.selectTime(date)}
                          id="time-slot"
                          style={{
                            width: 70,
                            height: 30,
                            borderStyle: "solid",
                            borderWidth:
                              this.state.currentSelectedTime == date ? 2 : 0,
                            borderColor:
                              this.state.currentSelectedTime == date
                                ? "#E61E4D"
                                : "#f1f1f1",
                            padding: 5,
                            backgroundColor: "#f1f1f1",
                            borderRadius: 5,
                            opacity: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 3,
                          }}
                        >
                          {date}
                        </div>
                      );
                    })}
                  </div>
                )}
                {this.state.currentSelectedTime && (
                  <div
                    id="continue"
                    onClick={(e) => this.submit()}
                    style={{
                      zIndex: 99,
                      padding: 10,
                      borderRadius: 5,
                      backgroundColor: "#E61E4D",
                      width: 150,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: 600,
                    }}
                  >
                    SELL MY CLUTTER
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div>
          <HeaderBar sell={true} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 60,
            marginTop: 20,
          }}
        >
          <div
            style={{
              marginLeft: 40,
              marginRight: 10,
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            1. Book with any place below
          </div>
          <div
            style={{
              marginRight: 10,
              marginLeft: 10,
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            2. Bring your clutter / items
          </div>
          <div
            style={{
              marginLeft: 10,
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            3. Get paid for everything you have
          </div>
        </div>
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
              flexDirection: "column",
              width: "60vw",
              marginLeft: 20,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 600 }}>
              Sell your clutter
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
              Austin Locations
            </div>

            {this.state.collectorArray.map((collector, index) => {
              var avgRating = 0.0;
              for (var i = 0; i < collector.ratings.length; i++) {
                avgRating += collector.ratings[i];
              }
              if (collector.ratings.length > 0) {
                avgRating /= collector.ratings.length;
                avgRating = parseInt(avgRating * 100) / 100;
              } else {
                avgRating = "New";
              }

              return (
                <div
                  onClick={() =>
                    this.setState({
                      modal: collector,
                    })
                  }
                  id={"house"}
                  key={index}
                  onMouseEnter={() =>
                    this.highlightMarker(collector.lat, collector.lng)
                  }
                  onMouseLeave={() =>
                    this.unHighlightMarker(collector.lat, collector.lng)
                  }
                  style={{
                    display: "flex",
                    zIndex: 98,
                    flexDirection: "row",
                    width: "100%",
                    height: 250,
                    marginBottom: 10,
                    paddingBottom: 10,

                    borderBottomStyle: "solid",
                    borderBottomWidth: 2,
                    borderBottomColor: "#f1f1f1",
                  }}
                >
                  <div style={{ width: 250, marginRight: 20 }}>
                    <img
                      src={collector.house_picture}
                      style={{
                        imageResolution: "5dppx",
                        width: 250,
                        height: 250,
                        borderRadius: 5,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "60%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 18 }}>
                        {collector.house_address}
                      </div>
                    </div>

                    <div style={{ fontSize: 14 }}>
                      {collector.monday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 1 ? 600 : 400,
                          }}
                        >
                          <div style={{ marginRight: 10, width: 90 }}>
                            Monday
                          </div>
                          <div>{collector.monday[0]}</div>
                        </div>
                      )}
                      {collector.tuesday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 2 ? 600 : 400,
                          }}
                        >
                          <div style={{ marginRight: 10, width: 90 }}>
                            Tuesday
                          </div>
                          <div>{collector.tuesday[0]}</div>
                        </div>
                      )}
                      {collector.wednesday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 3 ? 600 : 400,
                          }}
                        >
                          <div
                            style={{
                              marginRight: 10,
                              width: 90,
                            }}
                          >
                            Wednesday
                          </div>
                          <div style={{}}>{collector.wednesday[0]}</div>
                        </div>
                      )}
                      {collector.thursday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 4 ? 600 : 400,
                          }}
                        >
                          <div style={{ marginRight: 10, width: 90 }}>
                            Thursday
                          </div>
                          <div>{collector.thursday[0]}</div>
                        </div>
                      )}
                      {collector.friday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 5 ? 600 : 400,
                          }}
                        >
                          <div style={{ marginRight: 10, width: 90 }}>
                            Friday
                          </div>
                          <div>{collector.friday[0]}</div>
                        </div>
                      )}
                      {collector.saturday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 6 ? 600 : 400,
                          }}
                        >
                          <div
                            style={{
                              marginRight: 10,
                              width: 90,
                            }}
                          >
                            Saturday
                          </div>
                          <div style={{}}>{collector.saturday[0]}</div>
                        </div>
                      )}
                      {collector.sunday && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            fontWeight:
                              this.state.today.getDay() == 0 ? 600 : 400,
                          }}
                        >
                          <div style={{ marginRight: 10, width: 90 }}>
                            Sunday
                          </div>
                          <div>{collector.sunday[0]}</div>
                        </div>
                      )}
                    </div>
                    <div
                      onClick={(e) => this.sellHere(e, collector)}
                      id="sell-here"
                      style={{
                        zIndex: 99,
                        marginTop: 20,
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "#E61E4D",
                        width: 150,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                    >
                      SELL HERE
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          height: 12,
                          width: 12,
                          marginRight: 3,
                          filter: "greyscale(100%)",
                        }}
                        src={Star}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: 20,
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{avgRating + " "}</div>
                      <div style={{ width: 5 }}></div>
                      <div>{"(" + collector.ratings.length + ")"}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 20 }}>More places coming soon!</div>
          </div>
          <div style={{ width: "70vw", minHeight: "80vh", marginRight: 20 }}>
            <MapWithASearchBox></MapWithASearchBox>
          </div>
        </div>
      </div>
    );
  }

  submit() {
    const time = this.state.currentSelectedTime;
    const date = this.state.daySelected;
    const day = this.state.dayOfTheWeek;
    const month = parseInt(this.state.monthSelected) + 1;
    const paypalEmail = this.state.paypalEmail;
    const collectorData = this.state.sellModal;
    var removedArray = [];
    var removedArrayString = "";
    if (day == 0) {
      removedArrayString = "sunday_filled";
      removedArray = collectorData.sunday_filled;
    } else if (day == 1) {
      removedArrayString = "monday_filled";
      removedArray = collectorData.monday_filled;
    } else if (day == 2) {
      removedArrayString = "tuesday_filled";
      removedArray = collectorData.tuesday_filled;
    } else if (day == 3) {
      removedArrayString = "wednesday_filled";
      removedArray = collectorData.wednesday_filled;
    } else if (day == 4) {
      removedArrayString = "thursday_filled";
      removedArray = collectorData.thursday_filled;
    } else if (day == 5) {
      removedArrayString = "friday_filled";
      removedArray = collectorData.friday_filled;
    } else if (day == 6) {
      removedArrayString = "saturday_filled";
      removedArray = collectorData.saturday_filled;
    }
    console.log(removedArray);
    removedArray.push(time);
    console.log(removedArray);

    api.sendEmail(
      paypalEmail,
      "Well see you at " +
        time +
        " on " +
        month +
        "/" +
        date +
        "/" +
        "20 at " +
        collectorData.house_address +
        "!" +
        "\n\n" +
        "Just knock or call 903-203-1286 when you arrive. Call the number if you have any questions as well!"
    );
    const tempBookings = collectorData.bookings;
    tempBookings.push({
      email: paypalEmail,
      time: time,
      month: month,
      date: date,
    });

    firebase
      .firestore()
      .collection("Collectors")
      .doc("andrewhouse")
      .update({
        [removedArrayString]: removedArray,
        bookings: tempBookings,
      })
      .then(() => {
        alert("Email sent confirming details!");
        window.location = "/";
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  selectTime(time) {
    this.setState({
      currentSelectedTime: time,
    });
  }

  seeTimes(date, collector) {
    var openTimes = [];
    var filledTimes = [];
    if (date.getDay() == 0) {
      openTimes = collector.sunday;
      filledTimes = collector.sunday_filled;
    } else if (date.getDay() == 1) {
      openTimes = collector.monday;
      filledTimes = collector.monday_filled;
    } else if (date.getDay() == 2) {
      openTimes = collector.tuesday;
      filledTimes = collector.tuesday_filled;
    } else if (date.getDay() == 3) {
      openTimes = collector.wednesday;
      filledTimes = collector.wednesday_filled;
    } else if (date.getDay() == 4) {
      openTimes = collector.thursday;
      filledTimes = collector.thursday_filled;
    } else if (date.getDay() == 5) {
      openTimes = collector.friday;
      filledTimes = collector.friday_filled;
    } else if (date.getDay() == 6) {
      openTimes = collector.saturday;
      filledTimes = collector.saturday_filled;
    }
    // Goal: For every open time, add a ten minute interval if that interval isn't already taken
    // 1) Break up the openTimes into 15 minute chunks
    const openTimesArr = [];
    for (var a = 0; a < openTimes.length; a++) {
      const openTime = openTimes[a];
      const startTime = this.getStartTime(openTime);
      const endTime = this.getEndTime(openTime);
      var currentTime = startTime;

      openTimesArr.push(currentTime);

      var i = 0;
      while (currentTime != endTime && i < 100) {
        i++;
        currentTime = this.add15Minutes(currentTime);
        if (currentTime != endTime) {
          openTimesArr.push(currentTime);
        }
      }
      // 2) Remove any chunk that is also contained in filledTimes
      for (var b = 0; b < openTimesArr.length; b++) {
        if (filledTimes.includes(openTimesArr[b])) {
          openTimesArr.splice(b, 1);
        }
      }
      // 3) Remove any time on the same day before our current time
      // for (var c = 0; c < openTimesArr.length; c++) {
      //   const openTime = openTimesArr[c];
      //   const today = new Date();
      //   const currentHours = today.getHours();
      //   const currentMinues = today.getMinutes();
      //   if (currentHours > this.toArmyTime(openTime)) {
      //     openTimesArr.splice(b, 1);
      //   }
      // }
    }
    // I now have the array of open times
    this.setState({
      currentDates: openTimesArr,
      daySelected: date.getDate(),
      monthSelected: date.getMonth(),
      dayOfTheWeek: date.getDay(),
    });
  }

  toArmyTime(time) {
    const timeArr = time.split(":");
    if (timeArr.includes("PM")) {
    } else {
    }
  }

  add15Minutes(originalTime) {
    var number = -1;
    var time = -1;
    var oldHour = -1;
    var oldMinutes = -1;
    var newHour = -1;
    var newMinutes = -1;
    for (var a = 0; a < originalTime.length; a++) {
      if (originalTime.charAt(a) == ":") {
        oldHour = originalTime.substring(0, a);
        oldMinutes = originalTime.substring(a + 1, a + 3);
        number = originalTime.substring(0, a + 3);
        time = originalTime.substring(a + 4, a + 6);
      }
    }

    if (originalTime == "6:00 AM") {
      return "6:15 AM";
    } else if (originalTime == "9:45 AM") {
      return "10:00 AM";
    } else if (originalTime == "10:45 AM") {
      return "11:00 AM";
    } else if (originalTime == "11:45 AM") {
      return "12:00 PM";
    } else if (originalTime == "12:45 PM") {
      return "1:00 PM";
    } else if (originalTime == "12:45 AM") {
      return "1:00 AM";
    } else if (originalTime == "9:45 PM") {
      return "10:00 PM";
    }
    if (oldMinutes == "00") {
      return oldHour + ":15 " + time;
    } else if (oldMinutes == "15") {
      return oldHour + ":30 " + time;
    } else if (oldMinutes == "30") {
      return oldHour + ":45 " + time;
    } else if (oldMinutes == "45") {
      return parseInt(oldHour) + 1 + ":00 " + time;
    } else {
      return "X";
    }
  }

  getStartTime(openTime) {
    for (var a = 0; a < openTime.length; a++) {
      const c = openTime.charAt(a);
      if (c == "-") {
        return openTime.substring(0, a - 1);
      }
    }
  }

  getEndTime(openTime) {
    for (var a = 0; a < openTime.length; a++) {
      const c = openTime.charAt(a);
      if (c == "-") {
        return openTime.substring(a + 2, openTime.length);
      }
    }
  }

  continue() {
    const email1 = document.getElementById("email1").value;
    const email2 = document.getElementById("email2").value;
    if (email1 != email2) {
      alert("Emails don't match");
      return;
    } else if (!this.checkEmail(email1)) {
      alert("Bad email");
      return;
    }
    this.setState({
      question: 2,
      paypalEmail: email1,
    });
  }

  checkEmail(email) {
    if (!email) {
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  sellHere(e, collector, otherModal) {
    e.stopPropagation();
    if (otherModal) {
      this.setState({
        sellModal: collector,
        modal: false,
      });
    }
    this.setState({
      sellModal: collector,
    });
  }

  closeSellModal() {
    this.setState({
      question: 1,
      sellModal: false,
      currentSelectedTime: false,
      currentDates: false,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  highlightMarker(lat, lng) {
    if (this.state.x) {
      this.state.x(lat, lng);
    }
  }

  unHighlightMarker(lat, lng) {
    if (this.state.y) {
      this.state.y(lat, lng);
    }
  }

  currentlyOpen(collector) {
    const date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if (day == 0 && collector.sunday) {
      const sunday_hours = collector.sunday;
      for (var i = 0; i < sunday_hours.length; i++) {
        const time_slot = sunday_hours[i];
        var start_time = "";
        var end_time = "";
        // Get the times as strings
        for (var j = 0; j < time_slot.length; j++) {
          const ch = time_slot.charAt(j);
          if (ch == "-") {
            start_time = time_slot.substring(0, j);
            end_time = time_slot.substring(j + 1, time_slot.length);
          }
        }
        var start_hour = -1;
        var end_hour = -1;
        var start_minutes = -1;
        var end_minutes = -1;
        var start_am_pm = -1;
        var end_am_pm = -1;
        var am_pm = -1;
        var time = date
          .toLocaleTimeString()
          .replace(/([\d]+:[\d]{2})(:[\d]{2})(. *)/, "$1$3");
        for (var j = 0; j < start_time.length; j++) {
          if (start_time.charAt(j) == ":") {
            start_hour = parseInt(start_time.substring(0, j));
            start_minutes = parseInt(start_time.substring(j + 1, j + 3));
            start_am_pm = start_time.substring(j + 4, j + 6);
          }
        }
        for (var j = 0; j < end_time.length; j++) {
          if (start_time.charAt(j) == ":") {
            end_hour = parseInt(end_time.substring(0, j));
            end_minutes = parseInt(end_time.substring(j + 1, j + 3));
            end_am_pm = end_time.substring(j + 4, j + 6);
          }
        }

        for (var j = 0; j < time.length; j++) {
          if (time.charAt(j) == ":") {
            am_pm = time.substring(j + 4, time.length);
            break;
          }
        }

        // Check if the times are now

        // hour = 3;
        // minute = 33;
        // am_pm = "PM";
        if (
          this.compare_start_hours(start_hour, hour, start_am_pm, am_pm) &&
          this.compare_end_hours(end_hour, hour, end_am_pm, am_pm)
        ) {
          return true;
        } else if (start_hour == hour) {
          if (start_minutes <= minute) {
            return true;
          }
        } else if (end_hour == hour) {
          if (end_minutes >= minute) {
            return true;
          }
        }
      }
      return false;
    }
  }

  compare_start_hours(collector_hour, hour, col_am_pm, am_pm) {
    if (collector_hour == 10 || collector_hour == 11) {
      if (col_am_pm == "AM" && am_pm == "PM") {
        return true;
      }
    } else if (collector_hour == 12) {
      if (col_am_pm == "PM" && am_pm == "PM") {
        return true;
      } else {
        return false;
      }
    } else {
      return collector_hour < hour;
    }
  }

  compare_end_hours(collector_hour, hour, col_am_pm, am_pm) {
    if (collector_hour == 10 || collector_hour == 11) {
      if (col_am_pm == "AM" && am_pm == "PM") {
        return false;
      }
    } else if (collector_hour == 12) {
      if (col_am_pm == "PM" && am_pm == "PM") {
        return false;
      } else {
        return true;
      }
    } else {
      return collector_hour > hour;
    }
  }
}
