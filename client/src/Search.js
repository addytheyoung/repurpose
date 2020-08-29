import React, { Component } from "react";
import { Input, MenuItem, Select, Avatar } from "@material-ui/core";
import search from "./images/research.png";
import Close from "./images/close.png";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { closeModal } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          onClick={(e) => closeModal(e)}
          style={{
            backgroundColor: "#000000",
            left: 0,
            opacity: 0.5,
            zIndex: 99,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>

        <div
          style={{
            width: "60vw",
            borderRadius: 5,
            position: "fixed",
            height: "80vh",
            top: 30,
            backgroundColor: "#f5f5f5",
            zIndex: 100,
            opacity: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                onClick={() => closeModal()}
                src={Close}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 15,
                  marginRight: 15,
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                defaultValue={
                  this.props.searchTerm ? this.props.searchTerm : ""
                }
                id="address-input"
                placeholder="Search for anything"
                style={{ marginRight: 5, height: 40 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 120,
              }}
            >
              <Select
                style={{ height: 40, fontSize: 14, width: 120 }}
                id="category"
                defaultValue={"All Categories"}
              >
                <MenuItem value={"All Categories"}>All Categories</MenuItem>
                <MenuItem value={"Art & Decoration"}>Art & Decoration</MenuItem>
                <MenuItem value={"Books"}>Books</MenuItem>
                <MenuItem value={"Clothing, Shoes, & Accessories"}>
                  {"Clothing, Shoes, & Accessories"}
                </MenuItem>
                <MenuItem value={"Electronics"}>{"Electronics"}</MenuItem>
                <MenuItem value={"Home"}>{"Home"}</MenuItem>
                <MenuItem value={"Garden"}>{"Garden"}</MenuItem>

                <MenuItem value={"Pet Supplies"}>{"Pet Supplies"}</MenuItem>

                <MenuItem value={"Sports & Hobbies"}>
                  {"Sports & Hobbies"}
                </MenuItem>
                <MenuItem value={"Toys & Games"}>{"Toys & Games"}</MenuItem>
              </Select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <div
                id="search-button"
                onClick={() => this.search()}
                style={{
                  marginLeft: 5,
                  borderRadius: 5,
                  width: 40,
                  height: 40,
                  backgroundColor: "#e1e1e1",
                  display: "flex",
                  justifyContent: "center",
                  minWidth: 30,
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <img src={search} style={{ width: 20, height: 20 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  search() {
    var search = document.getElementById("address-input").value;
    const category = document.getElementById("category").textContent;
    const city = this.state.currentCity;
    if (!search || search.trim() === "") {
      alert("Bad search");
      return;
    }
    window.location.href =
      "/search/?" +
      "search=" +
      search +
      "&category=" +
      category +
      "&city=" +
      "Austin, TX";
    return;
  }
}
