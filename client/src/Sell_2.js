import React from "react";
import HeaderBar from "./HeaderBar";

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
      markerHigh: false,
      markers: [],
    };
  }

  render() {
    const refs = {};

    const MyMapComponent = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 32.2049, lng: -95.8555 }}
        >
          {this.state.markers.map((marker, index) => {
            return <Marker position={{ lat: marker.lat, lng: marker.lng }} />;
          })}
          {/* {props.isMarkerShown && !this.state.markerHigh && (
            <Marker
              onMouseOver={(e) => console.log(e.tb.target)}
              position={{ lat: 32.2049, lng: -95.8555 }}
            />
          )}
          {props.isMarkerShown && this.state.markerHigh && (
            <Marker
              onMouseOver={(e) => console.log(e.tb.target)}
              position={{ lat: 32.2533, lng: -95.8555 }}
            />
          )} */}
        </GoogleMap>
      ))
    );
    return (
      <div>
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
          <div style={{ marginRight: 10, width: 200 }}>
            1. Bring your clutter to any open house
          </div>
          <div style={{ marginRight: 10, marginLeft: 10, width: 200 }}>
            2. Knock or ring the doorbell
          </div>
          <div style={{ marginLeft: 10, width: 200 }}>
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
            <div
              onMouseEnter={(e) => this.highlightMarker(e)}
              onMouseLeave={(e) => this.unHighlightMarker(e)}
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
                  style={{ width: "100%", height: "100%", borderRadius: 5 }}
                />
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 18 }}>47 Longview Street</div>
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
                  <div style={{ marginRight: 10, width: 90, fontWeight: 700 }}>
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
            <div>House2</div>
          </div>
          <div style={{ width: "60vw" }}>
            <MyMapComponent
              isMarkerShown={true}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbpHHOjcFkGJeUaEIQZ-zNVaYBw0UVfzw"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            >
              <Marker position={{ lat: 32.2049, lng: -95.8555 }} />
            </MyMapComponent>
          </div>
        </div>
      </div>
    );
  }

  highlightMarker(e) {
    this.setState({
      markers: [{ lat: 32.25, lng: -95.8555 }],
    });
  }

  unHighlightMarker(e) {
    this.setState({
      markerHigh: false,
    });
  }
}
