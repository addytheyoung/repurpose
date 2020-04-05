import React from "react";
import "./css/FilterBar.css";
import DialogPrice from "./DialogPrice";

export default class FilterBar extends React.Component {
  render() {
    return (
      <div>
        <div
          id="bar"
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginLeft: 100,
          }}
        >
          <DialogPrice
            clearContent={() => this.changePrice("$0", "$999999")}
            changePrice={(min, max) => this.changePrice(min, max)}
          />
          {/* <div
            onClick={() => this.changeDelivery()}
            id="delivery"
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderStyle: "solid",
              padding: 10,
              borderColor: "#a1a1a1",
              marginLeft: 5,
              marginRight: 5
            }}
          >
            Delivery Options
          </div>
          <div
            onClick={() => this.changeTime()}
            id="delivery"
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderStyle: "solid",
              padding: 10,
              borderColor: "#a1a1a1",
              marginLeft: 5,
              marginRight: 5
            }}
          >
            Time on Site
          </div> */}
        </div>
      </div>
    );
  }

  changePrice(min, max) {
    this.props.updateFilter(min, max);
  }

  changeDelivery() {}

  changeTime() {}
}
