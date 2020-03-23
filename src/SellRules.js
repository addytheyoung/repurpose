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

export default class SellRules extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tableExpanded: false };
  }
  render() {
    const rows = [
      this.createData("$1.00-$5.00", "Large", "0% - 5%"),
      this.createData("$1.00-$5.00", "Medium", "5%-10%"),
      this.createData("$1.00-$5.00", "Small", "5%-15%"),
      this.createData("$5.00-$15.00", "Large", "15%"),
      this.createData("$5.00-$15.00", "Medium", "15%-20%"),
      this.createData("$5.00-$15.00", "Small", "20%-25%"),
      this.createData("$15.00-$30.00", "Large", "25%-30%"),
      this.createData("$15.00-$30.00", "Medium", "25%-35%"),
      this.createData("$15.00-$30.00", "Small", "25%-40%"),
      this.createData("$30.00+", "Large", "40%-80%"),
      this.createData("$30.00+", "Medium", "45%-80%"),
      this.createData("$30.00+", "Small", "50%-80%")
    ];
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
                <div>Quality Standards</div>
                <div style={{ marginTop: 10 }}>
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
                      If you don't think the item is worth at least $1, don't
                      send it.
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
                      No cheap big items
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        color: "#919191"
                      }}
                    >
                      Anything large AND cheap probably shouldn't be sent.
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
                <div>Shipping</div>
                <div style={{ marginTop: 10 }}>
                  Please follow our shipping guidelines, or you may be paid
                  less.
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
                      Shipping items that clearly don't pass our guidelines may
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
                <div>Payout</div>
                <div style={{ marginTop: 10 }}>
                  You are paid 5% - 80% of the price as soon as we recieve the
                  items and determine the price.
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
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
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
            <div
              id="edit"
              style={{
                backgroundColor: "#818181",
                borderRadius: 5,
                padding: 10,
                color: "white"
              }}
            >
              MAKE EDITS
            </div>
            <div style={{ width: 10 }}></div>
            <div
              id="kit"
              style={{
                backgroundColor: "#9da632",
                borderRadius: 5,
                padding: 10,
                color: "white"
              }}
            >
              GET MY KIT
            </div>
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
}
