import React from "react";
import "./css/FilterBar.css";
import DialogPrice from "./DialogPrice";
import DialogCategory from "./DialogCategory";

export default class FilterBar extends React.Component {
  render() {
    return (
      <div style={{}}>
        <div
          id="bar"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "7vw",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Filters
          </div> */}
          <DialogPrice
            clearContent={() => this.changePrice("$0", "$999999")}
            changePrice={(min, max) => this.changePrice(min, max)}
          />
          <DialogCategory
            clearContent={() =>
              this.changeCategory([
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
              ])
            }
            changeCategory={(categories) => this.changeCategory(categories)}
          />
        </div>
      </div>
    );
  }

  changeCategory(categories) {
    this.props.updateCategoryFilter(categories);
  }

  changePrice(min, max) {
    this.props.updateFilter(min, max);
  }

  changeDelivery() {}

  changeTime() {}
}
