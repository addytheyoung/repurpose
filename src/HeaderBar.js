import React from "react";
import { Input, MenuItem, Select } from "@material-ui/core";
import search from "./images/search.svg";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./css/HeaderBar.css";

export default class HeaderBar extends React.Component {
  render() {
    const path = window.location.pathname;
    return (
      <div>
        <div
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e8e8e8",
            borderBottomStyle: "solid"
          }}
        >
          <div
            style={{
              marginRight: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Repurpose
          </div>
          <Link
            to="/"
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              alignItems: "center",
              minWidth: 80,
              textDecoration: "none",
              color: "black",
              justifyContent: "center",
              backgroundColor: path === "/" ? "#e8e8e8" : "#ffffff",
              borderRadius: 5
            }}
          >
            Buy
          </Link>
          <Link
            to="sell"
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              alignItems: "center",
              minWidth: 80,
              textDecoration: "none",
              color: "black",
              justifyContent: "center",
              backgroundColor: path === "/sell" ? "#e8e8e8" : "#ffffff",
              marginRight: 20,
              borderRadius: 5
            }}
          >
            Sell
          </Link>
          <Input
            id="address-input"
            onBlur={() => this.focusSearch(false)}
            onFocus={() => this.focusSearch(true)}
            placeholder="Search for anything"
            style={{ width: 400, marginRight: 30 }}
          />
          <Select id="category" defaultValue={"All Categories"}>
            <MenuItem value={"All Categories"}>All Categories</MenuItem>
            <MenuItem value={"Antiques"}>Antiques</MenuItem>
            <MenuItem value={"Art"}>Art</MenuItem>
            <MenuItem value={"Baby"}>Baby</MenuItem>
            <MenuItem value={"Books"}>Books</MenuItem>
            <MenuItem value={"Cameras & Photo"}>{"Cameras & Photo"}</MenuItem>
            <MenuItem value={"Cell Phones & Accessories"}>
              {"Cell Phones & Accessories"}
            </MenuItem>
            <MenuItem value={"Clothing, Shoes, & Accessories"}>
              {"Clothing, Shoes, & Accessories"}
            </MenuItem>
            <MenuItem value={"Coins & Paper Money"}>
              {"Coins & Paper Money"}
            </MenuItem>
            <MenuItem value={"Collectibles"}>Collectibles</MenuItem>
            <MenuItem value={"Computers & Tablets"}>
              {"Computers & Tablets"}
            </MenuItem>
            <MenuItem value={"Consumer Electronics"}>
              Consumer Electronics
            </MenuItem>
            <MenuItem value={"Crafts / Arts & Crafts"}>
              {"Crafts / Arts & Crafts"}
            </MenuItem>
            <MenuItem value={"Dolls & Bears"}>{"Dolls & Bears"}</MenuItem>
            <MenuItem value={"Gift Cards & Coupons"}>
              {"Gift Cards & Coupons"}
            </MenuItem>
            <MenuItem value={"Health & Beauty"}>{"Health & Beauty"}</MenuItem>
            <MenuItem value={"Home & Garden"}>{"Home & Garden"}</MenuItem>
            <MenuItem value={"Jewelry & Watches"}>
              {"Jewelry & Watches"}
            </MenuItem>
            <MenuItem value={"Musical Instruments & Gear"}>
              {"Musical Instruments & Gear"}
            </MenuItem>
            <MenuItem value={"Pet Supplies"}>{"Pet Supplies"}</MenuItem>
            <MenuItem value={"Pottery & Glass"}>{"Pottery & Glass"}</MenuItem>
            <MenuItem value={"Sporting Goods"}>{"Sporting Goods"}</MenuItem>
            <MenuItem value={"Toys & Hobbies"}>{"Toys & Hobbies"}</MenuItem>
            <MenuItem value={"Everything Else"}>{"Everything Else"}</MenuItem>
          </Select>
          <div
            id="search-button"
            onClick={() => this.search()}
            style={{
              marginLeft: 20,
              borderRadius: 5,
              width: 50,
              height: 50,
              backgroundColor: "#d1d1d1",
              display: "flex",
              justifyContent: "center",
              minWidth: 50,
              alignItems: "center"
            }}
          >
            <img src={search} style={{ width: 30, height: 30 }} />
          </div>
          <div style={{ width: "10%" }}></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20
            }}
          >
            Profile
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20
            }}
          >
            Cart
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              minWidth: 100
            }}
          >
            Check out
          </div>
          {/* {!firebase.auth().currentUser && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                Profile
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  }

  search() {
    alert("search");
  }
}
