import React from "react";
import "./css/FilterBar.css";
import DialogPrice from "./DialogPrice";
import DialogCategory from "./DialogCategory";
import DialogElse from "./DialogElse";

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
            maxWidth: 150,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
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
                true,
              ])
            }
            changeCategory={(categories) => this.changeCategory(categories)}
          />
          {/* <DialogElse
            clearContent={() => this.clearContent()}
            changeContent={(clothing) => this.changeContent(clothing)}
          /> */}
        </div>
      </div>
    );
  }

  changeCategory(categories) {
    this.props.updateCategoryFilter(categories);
  }

  changeContent(clothing) {
    const type = clothing[0];
    const gender = clothing[1];
    this.props.updateMoreFilter(type, gender);
  }

  clearContent() {
    this.props.updateMoreFilter("all", "all");
  }

  changePrice(min, max) {
    this.props.updateFilter(min, max);
  }

  changeDelivery() {}

  changeTime() {}
}
