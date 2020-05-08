import React from "react";
import HeaderBar from "./HeaderBar";
import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import api from "./api";
import * as firebase from "firebase";
import "./css/Sell_2.css";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default class Sell_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      allMarkers: [],
      collectorArray: [],
      loaded: false,
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
    const MapWithASearchBox = compose(
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
              lat: 32.2049,
              lng: -95.8555,
            },
            markers: [],
            hoverOverThing: (lat, lng) => {
              if (!this.state.allMarkers) {
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
              this.setState({
                markers: this.state.allMarkers,
              });
            },
            onMapMounted: (ref) => {
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
                          const position = result.results[0].geometry.location;
                          markerArray.push(position);
                          if (i_index == collectorDocs.docs.length) {
                            this.setState({
                              markers: markerArray,
                              allMarkers: markerArray,
                            });
                          }
                        });
                    } else {
                      i_index++;
                    }
                  }
                });
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
        <div>
          <HeaderBar sell={true} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            marginBottom: 60,
            marginTop: 20,
            marginLeft: 20,
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
            }}
          >
            1. Bring your clutter to any open house
          </div>
          <div
            style={{
              marginRight: 10,
              marginLeft: 10,
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            2. Knock or ring the doorbell
          </div>
          <div
            style={{
              marginLeft: 10,
              width: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            3. Get paid cash for all your clutter
          </div>
          <div
            style={{
              padding: 10,
              backgroundColor: "#39df83",
              width: 150,
              color: "white",
              borderRadius: 5,
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              marginLeft: 50,
            }}
          >
            Or, let us come to you!
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40vw",
              marginLeft: 20,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 600 }}>
              Sell your clutter
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
              Athens Locations
            </div>

            {this.state.collectorArray.map((collector, index) => {
              console.log(collector);
              return (
                <div
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
                    flexDirection: "row",
                    width: "100%",
                    height: "25vh",
                  }}
                >
                  <div style={{ width: "50%", marginRight: 20 }}>
                    <img
                      src={
                        "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 5,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ fontSize: 18 }}>47 Westview Circle</div>
                    <div style={{ marginTop: 5 }}>Closed</div>
                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          marginRight: 10,
                          width: 90,
                          fontWeight: 700,
                        }}
                      >
                        Wednesday
                      </div>
                      <div style={{ fontWeight: 700 }}>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div style={{ marginRight: 10, width: 90 }}>Sunday</div>
                      <div>11AM - 9PM</div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div>House2</div>
          </div>
          <div style={{ width: "60vw", minHeight: "70vh" }}>
            <MapWithASearchBox></MapWithASearchBox>
            {/* <MyMapComponent
              isMarkerShown={true}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            >
              <Marker position={{ lat: 32.2049, lng: -95.8555 }} />
            </MyMapComponent> */}
          </div>
        </div>
      </div>
    );
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
}
