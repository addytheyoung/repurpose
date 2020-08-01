import React from "react";
import api from "./api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./css/PlacesAutocomplete.css";
import * as firebase from "firebase";

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
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.checkAddress(address, latLng))
      .then((res) => {
        if (res) {
          // Make a tmep accoutn and add the item if there is one
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
              localStorage.setItem("address", address);
              if (this.props.modal) {
                localStorage.setItem("cart", 1);
              } else {
                localStorage.setItem("cart", 0);
              }
              localStorage.setItem("city", "Austin, TX");
              localStorage.setItem("tempUid", uid);
              window.location.reload();
            });
        } else {
          // Too far.
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
            <div>
              <input
                id="delivery-address-input"
                style={{
                  width: mobile ? "80vw" : "40vw",
                  height: "5vh",
                  fontSize: 16,
                }}
                {...getInputProps({
                  placeholder: "Enter your city or zip code",
                  className: "location-search-input",
                })}
              />
              <div
                className="autocomplete-dropdown-container"
                style={{ height: "30vh", position: "fixed" }}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  if (i >= 3) {
                    return null;
                  }
                  return (
                    <div key={i}>
                      <div
                        className="dropdown-delivery"
                        {...getSuggestionItemProps(suggestion, {})}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    </div>
                  );
                })}
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
              width: 140,
              padding: "1vh",
              height: "4vh",
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
