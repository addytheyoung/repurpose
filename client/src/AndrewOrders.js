import React from "react";
import * as firebase from "firebase";

export default class AndrewOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderArr: [],
      loaded: false,
    };
    const finalArr = [];
    firebase
      .firestore()
      .collection("Orders")
      .get()
      .then((orders) => {
        for (var i = 0; i < orders.docs.length; i++) {
          const order = orders.docs[i];
          finalArr.push(order);
        }
        this.setState({
          orderArr: finalArr,
          loaded: true,
        });
      });
  }
  render() {
    if (
      !firebase.auth().currentUser ||
      firebase.auth().currentUser.uid != "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1" ||
      !this.state.loaded
    ) {
      return null;
    }

    return (
      <div style={{ marginLeft: 20, marginRight: 20 }}>
        <div>
          {this.state.orderArr.map((item, index) => {
            console.log();
            return (
              <div key={index}>
                <div
                  style={{
                    borderStyle: "solid",
                    padding: 5,
                    borderWidth: 1,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{"Order " + index}</div>
                  <div>
                    {"Deliver to " +
                      item.data().items[0].address +
                      ", " +
                      item.data().items[0].address2 +
                      ", " +
                      item.data().items[0].city}
                  </div>
                  <div>{item.data().items.length + " items to deliver"}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.data().items.map((itemData, index2) => {
                      return (
                        <div key={index2} style={{}}>
                          <img
                            style={{ width: 300, height: 300, borderRadius: 3 }}
                            src={itemData.pictures[0]}
                          ></img>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
