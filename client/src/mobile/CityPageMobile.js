import React from "react";
import Close from "../images/close.png";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/CityPageMobile.css";

export default class CityPageMobile extends React.Component {
  citiesList = ["Central TX"];

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center"
        }}
      >
        <div
          onClick={(e) => this.closeModal(e)}
          style={{
            backgroundColor: "#000000",
            opacity: 0.5,
            zIndex: 99,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>
        <div
          style={{
            width: "100vw",
            borderRadius: 5,
            position: "fixed",
            height: "100vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            // position: "absolute",
            zIndex: 100,
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                  top: 20,
                  right: 20,
                  position: "fixed",
                }}
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 32,
              marginLeft: "5%",
              fontWeight: "500",
              fontFamily: "Gill Sans",
              marginTop: 50,
              marginBottom: 50,
            }}
          >
            Location / Crate
          </div>

          <div
            style={{ marginLeft: 50, fontFamily: "Gill Sans", fontSize: 24 }}
          >
            You're viewing our only crate! (The Longhorn crate, for Austin and
            nearby areas)
          </div>
          <div
            style={{
              marginLeft: 50,
              fontFamily: "Gill Sans",
              marginTop: 20,
              fontSize: 20,
            }}
          >
            We'll be adding more soon!
          </div>
        </div>
      </div>
    );
  }

  closeModal(e) {
    this.props.closePage();
  }

  search() {
    const city = document.getElementById("combo-box-demo-mobile").value.trim();
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    window.location.href = "/";
  }

  updateCity(city) {
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    this.closeModal();
  }
}
