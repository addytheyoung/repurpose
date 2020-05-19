import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import api from "./api";
import * as firebase from "firebase";

export default class AndrewMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              console.log(this.state);

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
                            console.log("here");
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
    console.log(MapWithASearchBox);
    return (
      <div style={{ width: "40vw", minHeight: "70vh", marginRight: 20 }}>
        aaaa
        <MapWithASearchBox></MapWithASearchBox>
      </div>
    );
  }
}
