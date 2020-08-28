import React, { Component } from "react";
import Treasure from "./images/treasureGIMP.png";
import "./css/LoadingPage.css";

export default class LoadingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
      random: Math.random(),
    };
  }

  render() {
    const random = this.state.random;
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <img id="treasure" src={Treasure}></img>
        {random < 0.2 && (
          <div
            style={{
              fontFamily: "Gill Sans",
              fontSize: 26,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Opening the crate...
          </div>
        )}
        {random >= 0.2 && random < 0.4 && (
          <div
            style={{
              fontFamily: "Gill Sans",
              fontSize: 26,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Digging in the lost and found...
          </div>
        )}
        {random >= 0.4 && random < 0.6 && (
          <div
            style={{
              fontFamily: "Gill Sans",
              fontSize: 26,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Hunting some items...
          </div>
        )}
        {random >= 0.6 && random < 0.8 && (
          <div
            style={{
              fontFamily: "Gill Sans",
              fontSize: 26,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Getting the Cratemaster...
          </div>
        )}
        {/* {random >= 0.8 && random < 0.9 && (
          <div
            style={{
              fontFamily: 'Gill Sans',
              fontSize: 26,
              marginBottom: 30,
              marginTop: '1%',
              fontWeight: '500',
            }}>
            Building a Crate...
          </div>
        )} */}
        {random >= 0.8 && (
          <div
            style={{
              fontFamily: "Gill Sans",
              fontSize: 26,
              marginBottom: 30,
              marginTop: "1%",
              fontWeight: "500",
            }}
          >
            Having a Crate experience...
          </div>
        )}
      </div>
    );
  }
}
