import React from "react";
import Close from "../images/close.png";
import "../css/AboutPageMobile.css";
import Div100vh from "react-div-100vh";
import MobileChat from "./MobileChat";
import Treasure from "../images/treasureGIMP.png";

export default class AboutPageMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
          display: "flex",
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
            <div style={{ height: 20 }}></div>
            <MobileChat top={true} />

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
                style={{
                  padding: 10,
                  backgroundColor: "rgb(66, 108, 180)",
                  borderRadius: 5,
                  width: "50vw",
                  height: "6vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  BUY NOW
                </div>
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
                onClick={() => (window.location.href = "/sell")}
                style={{
                  padding: 10,
                  backgroundColor: "rgb(66, 108, 180)",
                  borderRadius: 5,
                  width: "50vw",
                  height: "6vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  SELL NOW
                </div>
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

  closeModal(e) {
    this.props.closePage();
  }
}
