import React from "react";
import Filter from "../images/filter.png";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Info from "../images/info.png";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import FilterListOutlinedIcon from "@material-ui/icons/FilterListOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

export default class FooterMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          height: "8vh",
          width: "100vw",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "15vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="search"
            style={{
              display: "flex",

              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
            }}
          >
            <HomeOutlinedIcon
              style={{
                width: "8vw",
                height: "8vw",
                color: "#426CB4",
              }}
            ></HomeOutlinedIcon>
            <div style={{ fontWeight: 500, marginTop: 10, color: "#426CB4" }}>
              Home
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100%",
            width: "15vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="search"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
            }}
          >
            <InfoOutlinedIcon
              style={{
                width: "8vw",
                height: "8vw",
              }}
            ></InfoOutlinedIcon>
            <div style={{ fontWeight: 500, marginTop: 10 }}>About</div>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "15vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="search"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
            }}
          >
            <SearchOutlinedIcon
              style={{
                width: "8vw",
                height: "8vw",
              }}
            ></SearchOutlinedIcon>
            <div style={{ fontWeight: 500, marginTop: 10 }}>Search</div>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "15vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="search"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
            }}
          >
            <AccountCircleOutlinedIcon
              style={{
                width: "8vw",
                height: "8vw",
              }}
            ></AccountCircleOutlinedIcon>
            <div style={{ fontWeight: 500, marginTop: 10 }}>Profile</div>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "15vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="search"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
            }}
          >
            <ShoppingCartOutlinedIcon
              style={{
                width: "8vw",
                height: "8vw",
              }}
            ></ShoppingCartOutlinedIcon>
            <div style={{ fontWeight: 500, marginTop: 10 }}>Cart</div>
          </div>
        </div>
      </div>
    );
  }
}
