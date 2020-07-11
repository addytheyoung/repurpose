import React from "react";
import Close from "../images/close.png";
import { MenuItem, Input, Select } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "../css/SearchPageMobile.css";

export default class SearchPageMobile extends React.Component {
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
          zIndex: 1,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100vw",
            position: "fixed",
            zIndex: 1,
            borderRadius: 5,
            height: "92.2vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30vh",
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
                  onKeyPress={(e) => this.keyPress(e)}
                  defaultValue={
                    this.props.searchTerm ? this.props.searchTerm : ""
                  }
                  id="search-input-mobile"
                  placeholder="Search for anything"
                  style={{ marginRight: 5, height: 40 }}
                />
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 120,
                }}
              >
                <Select id="category-mobile" defaultValue={"All Categories"}>
                  <MenuItem value={"All Categories"}>All Categories</MenuItem>
                  <MenuItem value={"Art & Decoration"}>
                    Art & Decoration
                  </MenuItem>
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
              </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  keyPress(e) {
    if (e.key == "Enter") {
      const search = document.getElementById("search-input-mobile").value;
      const city = localStorage.getItem("city");
      const category = "All Categories";
      if (!search || search.trim() === "") {
        alert("Bad search");
        return;
      }
      this.closeModal();
      window.location.href =
        "/search/?" +
        "search=" +
        search +
        "&category=" +
        category +
        "&city=" +
        city;
      return;
    }
  }

  closeModal(e) {
    this.props.closePage();
  }
}
