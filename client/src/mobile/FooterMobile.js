import React from "react";
import Filter from "../images/filter.png";

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
            <img
              src={Filter}
              style={{
                width: "6vw",
                height: "6vw",
              }}
            />
            <div style={{ fontWeight: 500, marginTop: 10 }}>Filter</div>
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
            <img
              src={Filter}
              style={{
                width: "6vw",
                height: "6vw",
              }}
            />
            <div style={{ fontWeight: 500, marginTop: 10 }}>Filter</div>
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
            <img
              src={Filter}
              style={{
                width: "6vw",
                height: "6vw",
              }}
            />
            <div style={{ fontWeight: 500, marginTop: 10 }}>Filter</div>
          </div>
        </div>
      </div>
    );
  }
}
