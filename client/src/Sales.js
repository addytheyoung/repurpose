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
        if (!sales || sales.length === 0) {
          this.setState({
            sales: sales,
            loaded: true,
          });
        }
        // We see if the item has been sold by seeing if it is still in the database
        const allSales = [];
        for (var i = 0; i < sales.length; i++) {
          const sale = sales[i];
          var i_index = 0;
          firebase
            .firestore()
            .collection("Categories")
            .doc(sale.category)
            .collection("All")
            .doc(sale.uid)
            .get()
            .then((a) => {
              i_index++;
              if (a.exists) {
                sale["sold"] = false;
              } else {
                sale["sold"] = true;
              }
              allSales.push(sale);
              console.log(allSales);
              if (i_index === sales.length) {
                this.setState({
                  sales: allSales,
                  loaded: true,
                });
              }
            });
        }
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
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 10,
                      }}
                    >
                      <div>{sale.title}</div>
                      <div>{"Listing price: $" + sale.original_price}</div>
                      <div style={{ fontWeight: 400 }}>
                        {"Item worth: $"}
                        {parseInt(sale.original_price) * 0.3}
                      </div>
                      {sale.sold && (
                        <div style={{ fontWeight: 600 }}>
                          {"Item sold! Money deposited to your account."}
                        </div>
                      )}
                      {!sale.sold && (
                        <div style={{ fontWeight: 600 }}>
                          {"Item not sold yet."}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <div style={{ marginLeft: 50, fontWeight: 600, fontSize: 20 }}>
              {"Total item worth: $" + totalPendingPay}
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
      if (sales[i].sold) {
        total += sales[i].original_price * 0.3;
      }
    }
    return total;
  }

  getTotalPendingPay(sales) {
    var total = 0;
    for (var i = 0; i < sales.length; i++) {
      if (!sales[i].sold) {
        total += sales[i].original_price * 0.3;
      }
    }
    return total;
  }
}
