import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/SellRules.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class SellRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableExpanded: false };
  }
  render() {
    const rows = [
      this.createData("$1.00-$5.00", "Small", "5%-15%"),
      this.createData("$1.00-$5.00", "Medium", "5%"),
      this.createData("$1.00-$5.00", "Large", "0%"),
      this.createData("$5.00-$15.00", "Small", "15%-25%"),
      this.createData("$5.00-$15.00", "Medium", "5%-10%"),
      this.createData("$5.00-$15.00", "Large", "0%-5%"),
      this.createData("$15.00-$30.00", "Small", "25%-40%"),
      this.createData("$15.00-$30.00", "Medium", "10%-20%"),
      this.createData("$15.00-$30.00", "Large", "5%-10%"),
      this.createData("$30.00+", "Small", "40%-80%"),
      this.createData("$30.00+", "Medium", "20%-40%"),
      this.createData("$30.00+", "Large", "5%-10")
    ];
    var kit = "box";
    if (window.location.pathname.includes("email")) {
      kit = "email";
    }
    var payment = "cash";
    if (window.location.pathname.includes("bank")) {
      payment = "bank";
    }

    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div style={{ padding: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 600 }}>
              Your Selling Kit
            </div>
            <div
              style={{
                marginTop: 20,
                width: "40vw",
                height: this.state.tableExpanded ? "auto" : "120vh",
                minWidth: 700,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#d1d1d1",
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                padding: 10
              }}
            >
              <div
                style={{
                  borderBottomColor: "#e1e1e1",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                  marginBottom: 30
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                  Quality Standards
                </div>
                <div style={{ marginTop: 10, marginBottom: 50 }}>
                  We only accept items that could have value to someone else.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      No Consumables
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Any partially consumed product, we do not take.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>1$ Rule</div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      If you don't think the item could be sold for at least $1,
                      don't send it.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      No big items
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Anything large or heavy should probably not be sent.
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderBottomColor: "#e1e1e1",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                  marginBottom: 30
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>Shipping</div>
                <div style={{ marginTop: 10, marginBottom: 50 }}>
                  Please follow our shipping guidelines, or you will charged.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      Shipping
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Shipping items that clearly don't pass our guidelines will
                      be taken out of your pay.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>Packing</div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Make sure to pack everything as tight as possible
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      Under 30 pounds
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Make sure the box is under 30 pounds. Request another box
                      if it isn't.
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderBottomColor: "#e1e1e1",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                  marginBottom: 30
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>Payout</div>
                <div style={{ marginTop: 10, marginBottom: 50 }}>
                  You are paid a % of the price as soon as we recieve the items.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                      margin: 10
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 500 }}>
                      Smaller, More Expensive, Higher Payout!
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      The smaller or more expensive an item, the more you get
                      paid.
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <div
                  onClick={() => this.setTableLength()}
                  id="expand"
                  style={{
                    textAlign: "center",
                    width: 100,
                    marginBottom: 10,
                    backgroundColor: "#a1a1a1",
                    borderRadius: 5,
                    padding: 10
                  }}
                >
                  {!this.state.tableExpanded && <div>Expand</div>}
                  {this.state.tableExpanded && <div>Shorten</div>}
                </div>
              </div>

              <TableContainer component={Paper} id="main">
                <Table aria-label="caption table" id="table">
                  <caption>Different prices and sizes for items</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell>Listing Price</TableCell>
                      <TableCell align="right">Item Size</TableCell>
                      <TableCell align="right">Your Payout</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: 16 }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell style={{ fontSize: 16 }} align="right">
                          {row.calories}
                        </TableCell>
                        <TableCell style={{ fontSize: 16 }} align="right">
                          {row.fat}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              justifyContent: "center"
            }}
          >
            <Link
              to="/sell/kit"
              id="edit"
              style={{
                backgroundColor: "#818181",
                borderRadius: 5,
                padding: 10,
                color: "white",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              MAKE EDITS
            </Link>
            <div style={{ width: 10 }}></div>

            {payment === "cash" && (
              <Link
                to="/sell/getkit"
                id="kit"
                style={{
                  backgroundColor: "#9da632",
                  borderRadius: 5,
                  padding: 10,
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                GET MY KIT
              </Link>
            )}

            {payment === "bank" && (
              <div
                onClick={() => this.openStripe()}
                id="kit"
                style={{
                  backgroundColor: "#9da632",
                  borderRadius: 5,
                  padding: 10,
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                GET MY KIT
              </div>
            )}
          </div>
          <div style={{ height: 200 }}></div>
        </div>
      </div>
    );
  }

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  setTableLength() {
    if (this.state.tableExpanded) {
      this.setState({
        tableExpanded: false
      });
    } else {
      this.setState({
        tableExpanded: true
      });
    }
  }

  openStripe() {
    const description =
      "&stripe_user%5Bproduct_description%5D=" +
      "I am selling a box of my items worth at least $5 to Collection.deals.";
    const business_type = "&stripe_user%5Bbusiness_type%5D=individual";

    window.open(
      "https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:3000/sell/getkit&client_id=ca_GziEvM247byG5XcbBDVdmFHV5l3vPz4h" +
        description +
        business_type
    );
  }
}
