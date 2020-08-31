import React, { Component } from "react";

export default class ItemScroller extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {};
  }

  render() {
    const { width, items, itemPage, title, mobile } = this.props;

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
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", width: "100vw", marginTop: "7vh" }}>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 500,
                textAlign: "center",
                marginLeft: "20vw",
                width: "60vw",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Gill Sans",
              }}
            >
              {title}
            </div>
            <div
              style={{
                opacity: 0.6,
                fontSize: 17,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              (1,000+)
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              id="mobile-prev-item"
              onClick={() =>
                this.scrollLeft(document.getElementById("scroll"), -300, 100)
              }
            >
              Prev
            </div>
            <div
              id="mobile-next-item"
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
              width: "98vw",
              marginLeft: "1vw",
              marginRight: "1vw",
              overflowX: "scroll",
              marginTop: 20,
            }}
          >
            {items.map((item, index) => {
              const discount = 1 - item.current_price;
              const currentPrice =
                item.original_price - item.original_price * discount;
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
                    width: "49vw",
                    marginLeft: "0.3vw",
                    marginRight: "0.3vw",
                    marginBottom: "1vh",
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
                      paddingLeft: "1vw",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        maxWidth: "48vw",
                        fontFamily: "Gill Sans",
                      }}
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
                        }}
                      >
                        {!showDecimals &&
                          "$" +
                            (Math.round(currentPrice * 100) / 100).toFixed(0)}
                        {showDecimals &&
                          "$" +
                            (Math.round(currentPrice * 100) / 100).toFixed(2)}
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
            })}
          </div>
        </div>
      </div>
    );
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  scrollLeft(element, change, duration) {
    var start = element.scrollLeft,
      currentTime = 0,
      increment = 20;

    const t = this;
    const st = this.state;
    var animateScroll = function () {
      currentTime += increment;
      if (change > 0) {
        element.scrollLeft = element.scrollLeft + window.innerWidth / 5;
      } else {
        element.scrollLeft = element.scrollLeft - window.innerWidth / 5;
      }
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}
