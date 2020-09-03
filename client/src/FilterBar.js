import React from "react";
import "./css/FilterBar.css";
import DialogPrice from "./DialogPrice";
import DialogCategory from "./DialogCategory";
import DialogSale from "./DialogSale";
import DialogPage from "./DialogPage";

export default class FilterBar extends React.Component {
  render() {
    const { activePage, closePage } = this.props;
    if (activePage) {
      return (
        <div
          style={{
            position: "fixed",
            height: "90vh",
            top: "10vh",
            backgroundColor: "#ffffff",
            borderRightStyle: "solid",
            borderRightWidth: 1,
            borderRightColor: "lightgrey",
            height: "100vh",
            width: 200,
          }}
        >
          <div
            onClick={() => closePage()}
            id="bar"
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 50,
            }}
          >
            <div
              style={{
                fontFamily: "Gill Sans",
                fontSize: 16,
                // color: 'rgb(24, 118, 242)',
              }}
            >
              {activePage}
            </div>
            <div
              style={{
                fontFamily: "Gill Sans",
                fontSize: 16,
                color: "rgb(24, 118, 242)",
                paddingLeft: 5,
              }}
            >
              {"[X]"}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          position: "fixed",
          height: "90vh",
          top: "10vh",
          backgroundColor: "#ffffff",
          borderRightStyle: "solid",
          borderRightWidth: 1,
          borderRightColor: "lightgrey",
          height: "100vh",
          width: 200,
        }}
      >
        <div
          id="bar"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
            marginTop: 50,
          }}
        >
          {/* <DialogPrice
            clearContent={() => this.changePrice("$0", "$999999")}
            changePrice={(min, max) => this.changePrice(min, max)}
          /> */}
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
          <DialogSale changeSale={(sales) => this.changeSale(sales)} />
          <DialogPage changePage={(page) => this.changePage(page)} />
        </div>
      </div>
    );
  }

  changePage(page) {
    this.props.updatePage(page);
  }

  changeSale(sales) {
    this.props.updateSaleFilter(sales);
  }

  changeCategory(category) {
    this.props.updateCategoryFilter(category);
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
