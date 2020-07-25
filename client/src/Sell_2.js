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
import Clock from "./images/clock.svg";
import Money from "./images/money.svg";
import Delivery from "./images/delivery.svg";
import MultImageUpload from "./MultiImageUpload";

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
      window.location.reload();
    }
    this.state = {
      profile: false,
      priceItems: false,
    };
  }

  render() {
    localStorage.setItem("city", "Austin, TX");
    return (
      <div
        style={{ overflowY: "scroll", height: "100vh", overflowX: "hidden" }}
      >
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
            marginTop: "8vh",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 600, fontFamily: "Pridi" }}>
            Sell your clutter with Collection
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 60 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  width: 190,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                Choose a time you're free
              </div>
              <img
                src={Clock}
                style={{ width: 50, height: 50, marginTop: 10 }}
              />
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  width: 190,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                We send a truck to pick everything up
              </div>
              <img
                src={Delivery}
                style={{ width: 50, height: 50, marginTop: 10 }}
              />
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                  width: 190,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                We price each item, and pay YOU when they sell
              </div>
              <img
                src={Money}
                style={{ width: 50, height: 50, marginTop: 10 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", marginTop: 80 }}>
            <div style={{ fontSize: 26, marginRight: 10 }}>
              {" "}
              Call to get started:
            </div>
            <div style={{ fontWeight: 800, fontSize: 26 }}>(903)-203-1286</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 8 }}>
            <div style={{ fontSize: 14 }}>
              Call 24 hours a day, 7 days a week.
            </div>
            <div
              id="click"
              style={{ color: "blue", fontSize: 14, marginLeft: 5 }}
              onClick={() => this.startSelling()}
            >
              Or, fill out the form here!
            </div>
          </div>

          {this.state.priceItems && (
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  marginTop: 40,
                  marginBottom: 20,
                  width: 350,
                  textAlign: "center",
                }}
              >
                Upload a picture OR some info, and we'll let you know how much
                we would pay for it!
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <MultImageUpload />
              </div>
            </div>
          )}

          {!this.state.priceItems && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: 120, fontWeight: 500, fontSize: 20 }}>
                See how much you'll make from your items here
              </div>
              <div style={{ fontSize: 13, marginTop: 10 }}>
                Our sellers have made over $10,000 already!
              </div>

              {/* <div
            style={{
              // marginTop: 40,
              fontSize: 16,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            We've bought over $9,000 worth of items in Austin already
          </div> */}
              <div
                onClick={() => this.priceMyItems()}
                id="sell-button"
                style={{
                  // marginTop: 120,
                  padding: 10,
                  marginTop: 20,
                  width: 160,
                  textAlign: "center",
                  backgroundColor: "rgb(230, 30, 77)",
                  borderRadius: 5,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                PRICE MY ITEMS
              </div>
            </div>
          )}
          {/* <div
            onClick={() => this.startSelling()}
            id="sell-button"
            style={{
              marginTop: 120,
              padding: 10,
              width: 160,
              textAlign: "center",
              backgroundColor: "rgb(230, 30, 77)",
              borderRadius: 5,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Or, fill out your own info here!
          </div> */}

          <div
            style={{
              paddingTop: 40,
              marginTop: 40,
              borderTopStyle: "solid",
              borderTopWidth: 2,
              borderTopColor: "#d1d1d1",
              marginBottom: 100,
            }}
          >
            {/* <div
              style={{
                textAlign: "center",
                marginBottom: 20,
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Testimonials
            </div> */}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Amy - Austin, TX
                </div>
                <div
                  style={{
                    width: "20vw",
                    marginLeft: 15,
                    marginRight: 15,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  "Super easy. They came and took away all my old clothes and
                  furniure, and I got paid more than I thought it was worth!"
                </div>
              </div>
              <div>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Christy - Round Rock, TX
                </div>
                <div
                  style={{
                    width: "20vw",
                    marginLeft: 15,
                    marginRight: 15,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  "We were moving, and I was going to just take all our stuff to
                  Goodwill one car at a time, but they came and actually took it
                  all away, and paid me for it! Super easy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  priceMyItems() {
    this.setState({
      priceItems: true,
    });
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
