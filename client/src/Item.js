import React from "react";

export default class Item extends React.Component {
  render() {
    const { item, index, itemPage } = this.props;

    const discount = 1 - item.current_price;
    const currentPrice = item.original_price - item.original_price * discount;
    var showDecimals = true;
    if (currentPrice % 1 == 0) {
      // It's a while number. Don't show decimals.
      showDecimals = false;
    }
    return (
      <div
        key={index}
        onClick={() => itemPage(item)}
        id="box"
        style={{
          width: 220,
          marginLeft: 10,
          marginRight: 10,
          height: 280,
        }}
      >
        <img
          src={item.pictures[0]}
          style={{
            width: 220,
            height: 200,
            borderRadius: 5,
            overflow: "hidden",
          }}
        ></img>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ fontSize: 18, fontWeight: 500, fontFamily: "Gill Sans" }}
          >
            {item.title}
          </div>
          <div
            style={{
              marginTop: 5,
              fontWeight: 600,
              fontSize: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 20,
                // fontFamily: "Gill Sans",
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
              {Math.round(discount * 100).toFixed(0) + "%"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
