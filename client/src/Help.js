import React from "react";
import "./css/About.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Treasure from "./images/treasureGIMP.png";

export default class Help extends React.Component {
  render() {
    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    const category = urlParams.get("header");
    var header = true;
    if (category && category == "fdc") {
      header = false;
    }
    if (isMobile) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            overflowY: "scroll",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "80vw",
              zIndex: 1,
              borderRadius: 5,
              opacity: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => (window.location.href = "/")}
                id="bar"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <div
                  style={{
                    fontFamily: "Pridi",
                    fontWeight: 700,
                    marginLeft: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 32,
                    color: "#426CB4",
                  }}
                >
                  Tate's
                </div>
                <div
                  style={{
                    fontFamily: "Pridi",
                    fontWeight: 700,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 32,
                    color: "#AF7366",
                    marginLeft: 5,
                  }}
                >
                  Crate
                </div>
                <img
                  style={{ width: 50, height: 50, marginLeft: 20 }}
                  src={Treasure}
                ></img>
              </div>

              <div
                className="about-mobile-main-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="about-mobile-main-3">Buyers: How we work</div>
                <div>
                  Buy any items you want: Furniture, art, anything, and we
                  deliver all of it directly to you for just $2, no matter how
                  many items.
                </div>
                <div>
                  Yes, you can buy $100 worth of items and it's just $2 for
                  delivery
                </div>
                <div>
                  Items are added and prices drop everyday. Since we always have
                  items coming in, we want to get rid of a lot of our inventory.
                  Check back often for deals and new items!
                </div>
                <div
                  onClick={() => (window.location.href = "/")}
                  className="about-main-button"
                >
                  BUY NOW
                </div>
              </div>

              <div
                className="about-mobile-main-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "2vh",
                }}
              >
                <div
                  className="about-mobile-main-3"
                  style={{ marginTop: "3vh" }}
                >
                  Sellers: How we work
                </div>
                <div>
                  We come and pick up all the items you don't want, and pay you
                  commission when they sell.
                </div>
                <div>
                  If you have a lot of stuff you want to sell, we sell it and
                  get you paid seamlessly.
                </div>
                <div>
                  There is a $15 up front charge to pick up the items, just to
                  make sure we aren't getting just a few items!
                </div>
                <div>
                  If the items don't sell after 2 months, you are free to come
                  and get them back, leave them with us to keep selling, or
                  donate them.
                </div>
                <div
                  onClick={() => (window.location.href = "/")}
                  className="about-main-button"
                >
                  SELL NOW
                </div>
                {/* <div style={{ height: "8vh" }}></div> */}
              </div>
            </div>
            <div className="about-mobile-main-1">
              Call 903-203-1286 or email andrew@collection.deals if you have any
              concerns or questions!
            </div>
            <div style={{ height: "20vh" }}></div>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowY: "scroll",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "50vw",
            zIndex: 1,
            borderRadius: 5,
            opacity: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              onClick={() => (window.location.href = "/")}
              id="bar"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <div
                style={{
                  fontFamily: "Pridi",
                  fontWeight: 700,
                  marginLeft: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 32,
                  color: "#426CB4",
                }}
              >
                Tate's
              </div>
              <div
                style={{
                  fontFamily: "Pridi",
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 32,
                  color: "#AF7366",
                  marginLeft: 5,
                }}
              >
                Crate
              </div>
              <img
                style={{ width: 50, height: 50, marginLeft: 20 }}
                src={Treasure}
              ></img>
            </div>

            <div
              className="about-mobile-main-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="about-mobile-main-3">Buyers: How we work</div>
              <div>
                Buy any items you want: Furniture, art, anything, and we deliver
                all of it directly to you for just $2, no matter how many items.
              </div>
              <div>
                Prices drop every 3 hours (see the timer), up to 90%, and new
                items are added often
              </div>
              <div>
                Items are added and prices drop everyday. Since we always have
                items coming in, we want to get rid of a lot of our inventory.
                Check back often for deals and new items!
              </div>
              <div>Delivery will always be less than 24 hours.</div>
              <div
                onClick={() => (window.location.href = "/")}
                className="about-main-button"
              >
                BUY NOW
              </div>
            </div>

            <div
              className="about-mobile-main-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2vh",
              }}
            >
              <div className="about-mobile-main-3" style={{ marginTop: "3vh" }}>
                Sellers: How we work
              </div>
              <div>
                We come and pick up all the items you don't want, and pay you
                commission when they sell.
              </div>
              <div>
                If you have a lot of stuff you want to sell, we sell it and get
                you paid seamlessly.
              </div>
              <div>
                There is a $15 up front charge to pick up the items, just to
                make sure we aren't getting just a few items!
              </div>
              <div>
                If the items don't sell after 2 months, you are free to come and
                get them back, leave them with us to keep selling, or donate
                them.
              </div>
              <div
                onClick={() => (window.location.href = "/")}
                className="about-main-button"
              >
                SELL NOW
              </div>
              {/* <div style={{ height: "8vh" }}></div> */}
            </div>
          </div>
          <div className="about-mobile-main-1">
            Call 903-203-1286 or email andrew@collection.deals if you have any
            concerns or questions!
          </div>
        </div>
        <div style={{ height: "20vh" }}></div>
      </div>
    );
  }
}
