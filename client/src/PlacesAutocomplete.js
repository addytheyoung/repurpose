import React from "react";
import api from "./api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./css/PlacesAutocomplete.css";
import * as firebase from "firebase";
import { add } from "lodash";
import ClipLoader from "react-spinners/ClipLoader";
import Pin from "./images/gps.svg";

export default class LocationSearchInput extends React.Component {
  lngPerMile = 57;
  latPerMile = 69;
  lat = -1;
  lng = -1;

  constructor(props) {
    super(props);
    this.state = { address: "", currentInput: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.props.loading(false);
    if (address == "") {
      if (this.props.mobile) {
        this.props.openAddressModal();
      } else {
        alert("Please put in your city or zip!");
      }
      this.props.loading(true);
      return;
    }

    console.log(address);
    this.setState({
      loading: true,
    });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.checkAddress(address, latLng))
      .then((res) => {
        if (res) {
          // Make a tmep accoutn and add the item iaf there is one
          // const uid = this.randomNumber(20);
          const uid = this.randomNumber(20);
          firebase
            .firestore()
            .collection("Users")
            .doc(uid)
            .set({
              cart: this.props.modal ? [this.props.modal] : [],
              orders: [],
              sales: [],
              temporary: true,
              main_address: address,
              lat: this.lat,
              lng: this.lng,
            })
            .then(() => {
              this.props.loading(true);
              localStorage.setItem("address", address);
              if (this.props.modal) {
                localStorage.setItem("cart", 1);
              } else {
                localStorage.setItem("cart", 0);
              }
              localStorage.setItem("tempUid", uid);
              window.location.href = "/home-redirect";
            });
        } else {
          // Too far.
          this.props.loading(true);
          alert("Sorry, we're not in your city yet. We will be soon!");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  render() {
    const mobile = this.props.mobile;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                onClick={() => (mobile ? this.props.openAddressModal() : null)}
                id="delivery-address-input-container"
                style={{
                  width: mobile ? "92vw" : "42vw",
                  height: "6vh",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderStyle: "solid",
                  borderWidth: 1.5,
                  borderColor: "rgb(118, 118, 118)",
                  borderRadius: 3,
                }}
              >
                <img
                  src={Pin}
                  style={{
                    width: "3vh",
                    height: "3vh",
                    marginLeft: "1vh",
                    marginRight: "1vh",
                  }}
                />
                <input
                  autoFocus={this.props.activeButton ? false : true}
                  id="delivery-address-input"
                  style={{
                    width: mobile ? "90vw" : "40vw",
                    height: "5vh",
                    fontSize: 18,
                    border: "none",
                    padding: 0,
                    margin: 0,
                  }}
                  {...getInputProps({
                    placeholder: "Enter your city or zip code",
                    className: "location-search-input",
                  })}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  id="autocomplete-dropdown-container"
                  className="autocomplete-dropdown-container"
                  style={{
                    // maxHeight: "30vh",
                    minWidth: mobile ? "90vw" : "40vw",
                    width: mobile ? "90vw" : "40vw",
                    zIndex: 999,
                    borderWidth: suggestions.length > 0 ? 1 : 0,
                    borderRadius: 3,
                    borderColor: "grey",
                    borderStyle: "solid",
                    position: "absolute",
                    top: mobile ? "0vh" : "0vh",
                  }}
                >
                  {suggestions.map((suggestion, i) => {
                    if (i >= 3) {
                      return null;
                    }
                    return (
                      <div
                        id="address-drop"
                        key={i}
                        style={{
                          minHeight: mobile ? "10vh" : "10vh",
                          borderBottomWidth: 1,
                          borderBottomStyle: "solid",
                          borderBottomColor: "grey",
                          backgroundColor: "#ffffff",
                          zIndex: 999,
                        }}
                      >
                        <div
                          style={{
                            minHeight: mobile ? "10vh" : "10vh",
                            zIndex: 999,
                            maxWidth: "50vw",
                            fontSize: 18,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                          }}
                          {...getSuggestionItemProps(suggestion, {})}
                        >
                          <span style={{ fontWeight: 500, zIndex: 999 }}>
                            {suggestion.description}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        {this.props.activeButton && (
          <div
            onClick={() => this.handleSelect(this.state.address)}
            id="start"
            style={{
              marginLeft: mobile ? 0 : 10,
              width: mobile ? "90vw" : 140,
              padding: "1vh",
              minHeight: 45,
              height: mobile ? "6vh" : "5.5vh",
              borderRadius: 6,
              backgroundColor: "#426CB4",
              fontWeight: 700,
              fontSize: 18,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: mobile ? "2vh" : 0,
            }}
          >
            SEE ITEMS
          </div>
        )}
      </div>
    );
  }

  randomNumber(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async checkAddress(address, latLngObj) {
    const lat = latLngObj.lat;
    const lng = latLngObj.lng;
    this.lat = lat;
    this.lng = lng;

    // Check that they are within delivery range
    return api
      .getLatLng("Austin, TX")
      .then((a) => {
        const lat2 = a.results[0].geometry.location.lat;
        const lng2 = a.results[0].geometry.location.lng;
        // Check that they are within delivery range
        const x =
          Math.pow((lat2 - lat) * this.latPerMile, 2) +
          Math.pow((lng2 - lng) * this.lngPerMile, 2);
        const milesBetween = Math.sqrt(x);
        console.log(milesBetween);

        if (milesBetween >= 24) {
          return false;
        } else {
          return true;
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}
