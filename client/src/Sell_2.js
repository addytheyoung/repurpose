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
import Next from "./images/next.svg";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import SignInModal from "./SignInModal";

export default class Sell_2 extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("city") || localStorage.getItem("city") == "") {
      localStorage.setItem("city", "Austin, TX");
    }
    this.state = {
      profile: false,
    };
  }

  render() {
    localStorage.setItem("city", "Austin, TX");
    return (
      <div>
        {this.state.profile && (
          <SignInModal
            redirectUrl={"/sell-info"}
            closeModal={() => this.closeModal()}
          />
        )}
        <div>
          <HeaderBar sell={true} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10vh",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 24 }}>We buy all your clutter!</div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 40 }}>
            <div
              style={{
                marginRight: 5,
                marginLeft: 5,
                width: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Choose a time you're free
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <img src={Next} style={{ width: 15, height: 15 }} />
            </div>
            <div
              style={{
                marginRight: 5,
                marginLeft: 5,
                width: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              We send a truck to pick everything up
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <img src={Next} style={{ width: 15, height: 15 }} />
            </div>
            <div
              style={{
                marginRight: 5,
                marginLeft: 5,
                width: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              We price each item, and pay you 30% up front
            </div>
          </div>
          <div style={{ marginTop: 100, fontSize: 24 }}>Sound good?</div>
          <div style={{ fontSize: 12, marginTop: 5 }}>
            Call 903-203-1286 if you have any questions or concerns!
          </div>
          <div
            onClick={() => this.startSelling()}
            id="sell-button"
            style={{
              marginTop: 50,
              padding: 10,
              backgroundColor: "#51d132",
              borderRadius: 5,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            LET'S GO
          </div>
        </div>
      </div>
    );
  }

  startSelling() {
    if (firebase.auth().currentUser) {
      window.location.href = "/sell-info";
    } else {
      // They must make an account
      this.setState({
        profile: true,
      });
    }
  }

  closeModal() {
    this.setState({
      profile: false,
      logout: false,
      email: false,
      newUser: false,
      retUser: false,
    });
  }
}
