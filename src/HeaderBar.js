import React from "react";
import { Input, MenuItem, Select } from "@material-ui/core";
import search from "./images/search.svg";
import * as firebase from "firebase";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./css/HeaderBar.css";
import Logo from "./images/test.png";

export default class HeaderBar extends React.Component {
  render() {
    const path = window.location.pathname;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e8e8e8",
            borderBottomStyle: "solid",
            width: "100vw"
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              textDecoration: "none",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: 140,
                fontWeight: 700,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 24,
                color: "#7628dd"
              }}
            >
              Re-Purpose
            </div>
          </Link>
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
              backgroundColor:
                path === "/" || path.includes("shop") ? "#e8e8e8" : "#ffffff",
              borderRadius: 5
            }}
          >
            Buy
          </Link>
          <Link
            to="/sell"
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              alignItems: "center",
              minWidth: 80,
              textDecoration: "none",
              color: "black",
              justifyContent: "center",
              backgroundColor: path.includes("sell") ? "#e8e8e8" : "#ffffff",
              marginRight: 50,
              borderRadius: 5
            }}
          >
            Sell
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Input
              id="address-input"
              placeholder="Search for anything"
              style={{ marginRight: 5, height: 40 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Select
              style={{ width: 130, height: 40 }}
              id="category"
              defaultValue={"All Categories"}
            >
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
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              id="search-button"
              onClick={() => this.search()}
              style={{
                marginLeft: 20,
                borderRadius: 5,
                width: 40,
                height: 40,
                backgroundColor: "#d1d1d1",
                display: "flex",
                justifyContent: "center",
                minWidth: 30,
                alignItems: "center",
                marginRight: 50
              }}
            >
              <img src={search} style={{ width: 20, height: 20 }} />
            </div>
          </div>
          {/* <div style={{ width: "10%" }}></div> */}
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
