import React from "react";
import HeaderBar from "./HeaderBar";
import ClipLoader from "react-spinners/ClipLoader";

import * as firebase from "firebase";

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Users")
      .doc("aty268")
      .get()
      .then((me) => {
        const myData = me.data();
        this.setState({
          orders: myData.orders,
          loaded: true,
        });
      });
    this.state = {
      orders: [],
      loaded: false,
    };
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "absolute",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div>
          {this.state.orders.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: "5vw",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div>
                  <img
                    id="box"
                    style={{
                      width: 220,
                      height: 200,
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                    src={item.pictures[0]}
                  ></img>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  <div>{item.title}</div>
                  <div>{"$" + item.original_price}</div>
                  {item.delivered && <div>Delivered</div>}
                  {!item.delivered && <div>Not yet delivered</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
