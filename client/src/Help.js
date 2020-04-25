import React from "react";
import HeaderBar from "./HeaderBar";

export default class Help extends React.Component {
  render() {
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("header");
    var header = true;
    if (category && category == "fdc") {
      header = false;
    }
    return (
      <div>
        {header && (
          <div>
            <HeaderBar />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
            fontSize: 20,
          }}
        >
          <div style={{ marginBottom: 30 }}>
            Any issues? Call us: <b>903-203-1286 </b>
            <br />
            Or email us: <b>andrew@collection.deals</b>
          </div>

          <div>
            We're VERY new, so please let us know if you have any problems or
            feedback :)
          </div>
        </div>
      </div>
    );
  }
}
