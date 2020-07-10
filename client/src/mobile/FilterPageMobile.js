import React from "react";
import Close from "../images/close.png";
import DialogPrice from "../DialogPrice";
import DialogCategory from "../DialogCategory";
import DialogElse from "../DialogElse";
import PriceDialogMobile from "./PriceDialogMobile";
import CategoryDialogMobile from "./CategoryDialogMobile";

export default class FilterPageMobile extends React.Component {
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
          // alignItems: "center"
        }}
      >
        <div
          onClick={(e) => this.closeModal(e)}
          style={{
            backgroundColor: "#000000",
            opacity: 0.5,
            zIndex: 99,
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        ></div>
        <div
          style={{
            width: "100vw",
            borderRadius: 5,
            position: "fixed",
            height: "100vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            // position: "absolute",
            zIndex: 100,
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                onClick={() => this.closeModal()}
                src={Close}
                style={{
                  width: "10vw",
                  height: "10vw",
                  marginTop: 40,
                  marginRight: 40,
                }}
              />
            </div>
            <div
              id="bar"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
              <PriceDialogMobile
                minPrice={this.props.minPrice}
                maxPrice={this.props.maxPrice}
                clearContent={() => this.changePrice("$0", "$999999")}
                changePrice={(min, max) => this.changePrice(min, max)}
              />
              <CategoryDialogMobile
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  changePrice(min, max) {
    this.props.updateFilter(min, max);
  }

  closeModal(e) {
    this.props.closePage();
  }
}
