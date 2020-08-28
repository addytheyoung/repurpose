import React, { Component } from "react";
import Item from "./Item";

export default class ItemScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { width, items, itemPage } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "1vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: width > 960 ? 960 : 720,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              textAlign: "center",
              fontFamily: "Gill Sans",
            }}
          >
            Items Near Austin
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              width: width > 960 ? 960 / 2 - 100 : 720 / 2 - 100,
            }}
          >
            <div
              id="prev-item"
              onClick={() =>
                this.scrollLeft(document.getElementById("scroll"), -300, 100)
              }
            >
              Prev
            </div>
            <div
              id="next-item"
              onClick={() =>
                this.scrollLeft(document.getElementById("scroll"), 300, 100)
              }
            >
              Next
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            id="scroll"
            style={{
              display: "flex",
              flexDirection: "row",
              maxWidth: width > 960 ? 960 : 720,
              overflowX: "scroll",
              overflowY: "hidden",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 30,
            }}
          >
            {items.map((item, index) => {
              return (
                <Item
                  item={item}
                  index={index}
                  itemPage={(item) => itemPage(item)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    const t = this;
    const st = this.state;
    var animateScroll = function () {
      currentTime += increment;
      var val = t.easeInOutQuad(currentTime, start, change, duration);

      if (change > 0) {
        if (st.width > 960) {
          element.scrollLeft = element.scrollLeft + 960 / 5;
        } else {
          element.scrollLeft = element.scrollLeft + 720 / 5;
        }
      } else {
        if (st.width > 960) {
          element.scrollLeft = element.scrollLeft - 960 / 5;
        } else {
          element.scrollLeft = element.scrollLeft - 720 / 5;
        }
      }
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  getWidth() {}
}
