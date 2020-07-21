import React from "react";
import api from "./api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./css/PlacesAutocomplete.css";

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
    console.log("handle");
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => this.checkAddress(address, latLng))
      .then((res) => {
        if (res) {
          localStorage.setItem("city", "Austin, TX");
          localStorage.setItem("deliveryLatitude", this.lat);
          localStorage.setItem("deliveryLongitude", this.lng);

          window.location.reload();
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
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
                style={{ width: "40vw", height: "5vh", fontSize: 16 }}
                {...getInputProps({
                  placeholder: "Enter your delivery address",
                  className: "location-search-input",
                })}
              />
              <div
                className="autocomplete-dropdown-container"
                style={{ height: "30vh", position: "fixed" }}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  if (i >= 4) {
                    return null;
                  }
                  return (
                    <div>
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
              marginLeft: 10,
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
            }}
          >
            GET STARTED
          </div>
        )}
      </div>
    );
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
