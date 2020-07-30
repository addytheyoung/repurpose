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
                  width: "10vw",
                  height: "10vw",
                  marginTop: 40,
                  marginRight: 40,
                }}
              />
            </div>
          </div>

          <div
            id="combo-box-demo-mobile-div"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
            }}
          >
            <Autocomplete
              id="combo-box-demo-mobile"
              defaultValue={"Central TX"}
              options={this.citiesList}
              getOptionLabel={(option) => option}
              renderOption={(option) => (
                <div
                  onClick={() => this.updateCity(option)}
                  style={{ width: "100%", height: "5vh", fontSize: 20 }}
                >
                  {option}
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  style={{ fontSize: 20, height: "5vh" }}
                  {...params}
                  variant="outlined"
                  fullWidth
                />
              )}
              freeSolo={true}
              style={{ width: "60vw", fontSize: 20, height: "5vh" }}
            />
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
