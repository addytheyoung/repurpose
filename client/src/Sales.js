import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";

export default class Sales extends React.Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((me) => {
        const sales = me.data().sales;
        this.setState({
          sales: sales,
          loaded: true,
        });
      });
    this.state = {
      sales: null,
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
            overflowX: "scroll",
            overflowY: "scroll",
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
    const totalPay = this.getTotalPay(this.state.sales);
    const totalPendingPay = this.getTotalPendingPay(this.state.sales);

    return (
      <div style={{ overflowX: "hidden" }}>
        <div>
          <HeaderBar />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {this.state.sales.length === 0 && <div>Nothing here</div>}
          {this.state.sales.length !== 0 &&
            this.state.sales.map((sale, index) => {
              return (
                <div
                  key={index}
                  style={{
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
                      src={sale.pictures[0]}
                    ></img>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{sale.title}</div>
                    <div>{"Listing price: $" + sale.original_price}</div>
                    <div style={{ fontWeight: 600 }}>
                      {"Your pay: $"}
                      {parseInt(sale.original_price) * 0.5}
                    </div>
                    {sale.paid && (
                      <div style={{ fontWeight: 600 }}>
                        {"Have you been paid? Not yet"}
                      </div>
                    )}
                    {!sale.paid && (
                      <div style={{ fontWeight: 600 }}>
                        {"Have you been paid? Not yet"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          <div>
            <div style={{ marginLeft: 50, fontWeight: 600, fontSize: 20 }}>
              {"Total pending pay: $" + totalPendingPay}
            </div>
            <div style={{ marginLeft: 50, fontWeight: 600, fontSize: 20 }}>
              {"Total pay: $" + totalPay}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getTotalPay(sales) {
    var total = 0;
    for (var i = 0; i < sales.length; i++) {
      if (sales[i].paid) {
        total += sales[i].original_price * 0.5;
      }
    }
    return total;
  }

  getTotalPendingPay(sales) {
    var total = 0;
    for (var i = 0; i < sales.length; i++) {
      if (!sales[i].paid) {
        total += sales[i].original_price * 0.5;
      }
    }
    return total;
  }
}
