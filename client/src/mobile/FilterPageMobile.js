import React from "react";
import Close from "../images/close.png";
import DialogPrice from "../DialogPrice";
import DialogCategory from "../DialogCategory";
import DialogElse from "../DialogElse";
import PriceDialogMobile from "./PriceDialogMobile";
import CategoryDialogMobile from "./CategoryDialogMobile";
import SaleDialogMobile from "./SaleDialogMobile";

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
          zIndex: 220,
          height: "90vh",
          width: "100vw",
          overflowY: "hidden",
        }}
      >
        <div
          style={{
            width: "100vw",
            borderRadius: 5,
            minHeight: "100vh",
            top: 0,
            backgroundColor: "#f5f5f5",
            zIndex: 220,
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
                  width: "4vh",
                  height: "4vh",
                  top: "3vh",
                  right: "3vh",
                  position: "fixed",
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
              <SaleDialogMobile
                sales={this.props.sales}
                clearContent={() =>
                  this.changeSales([
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
                changeSales={(min, max) => this.changeSales(min, max)}
              />
              <CategoryDialogMobile
                categories={this.props.categories}
                changeCategory={(category) => this.changeCategory(category)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeSales(sales) {
    this.props.updateSaleFilter(sales);
  }

  changeCategory(category) {
    this.props.updateCategoryFilter(category);
  }

  changePrice(min, max) {
    this.props.updateFilter(min, max);
  }

  closeModal(e) {
    this.props.closePage();
  }
}
