import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { item, index, itemPage } = this.props;

    const discount = 1 - item.current_price;
    const currentPrice = item.original_price - item.original_price * discount;
    var showDecimals = true;
    if (currentPrice % 1 == 0) {
      // It's a while number. Don't show decimals.
      showDecimals = false;
    }
    const f = Math.round(discount * 100).toFixed(0);

    return (
      <div
        key={index}
        style={{
          width: "49vw",
          marginLeft: "0.3vw",
          marginRight: "0.3vw",
          marginBottom: "1vh",
        }}
      >
        <div
          onClick={() => itemPage(item)}
          id="box"
          style={{
            width: "49vw",
          }}
        >
          <img
            src={item.pictures[0]}
            style={{
              width: "49vw",
              height: "44.5vw",
              borderRadius: 5,
              overflow: "hidden",
            }}
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 50,
              display: "block",
              paddingLeft: "1vw",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 400,
                maxWidth: "48vw",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                {!showDecimals &&
                  "$" + (Math.round(currentPrice * 100) / 100).toFixed(0)}
                {showDecimals &&
                  "$" + (Math.round(currentPrice * 100) / 100).toFixed(2)}
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#cc0000",
                  opacity: discount == 0 ? 0 : discount * 15 * 0.25,
                }}
              >
                {f + "%"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
