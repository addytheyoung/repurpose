import React from "react";
import HeaderBar from "./HeaderBar";
import "./css/OrderKit.css";
import { Input, Select, MenuItem } from "@material-ui/core";

export default class OrderKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kit: "email"
    };
  }
  render() {
    return (
      <div>
        <div>
          <HeaderBar />
        </div>
        <div style={{ margin: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ marginTop: 30 }}>YOUR SELLING KIT</div>
            <div
              style={{
                width: "40vw",
                minWidth: 700,
                marginTop: 30,
                height: "50vh",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "15vh",
                  borderBottomWidth: 1,
                  borderBottomStyle: "solid",
                  borderBottomColor: "#999999"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    minWidth: 300
                  }}
                >
                  <div
                    style={{
                      fontWeight: 500,
                      paddingLeft: 10,
                      marginBottom: 5
                    }}
                  >
                    Type of kit
                  </div>
                  {this.state.kit === "email" && (
                    <div style={{ color: "#a1a1a1", paddingLeft: 10 }}>
                      Print the label and put it on any box.
                    </div>
                  )}
                  {this.state.kit === "box" && (
                    <div style={{ color: "#a1a1a1", paddingLeft: 10 }}>
                      We mail you a box to put your items in.
                    </div>
                  )}
                </div>
                <div style={{ width: "100%" }}></div>
                <div
                  id="email"
                  style={{
                    backgroundColor:
                      this.state.kit === "email" ? "#ffffff" : "#f1f1f1",

                    fontWeight: this.state.kit === "email" ? 500 : 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "50%",
                    padding: 10,
                    minWidth: 150,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor:
                      this.state.kit === "email" ? "#48d6db" : "#eaeaea"
                  }}
                  onClick={() => this.setKit("email")}
                >
                  Email Shipping Label
                </div>
                <div
                  id="box"
                  style={{
                    backgroundColor:
                      this.state.kit === "box" ? "#ffffff" : "#f1f1f1",
                    fontWeight: this.state.kit === "box" ? 500 : 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    height: "50%",
                    minWidth: 150,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor:
                      this.state.kit === "box" ? "#48d6db" : "#eaeaea"
                  }}
                  onClick={() => this.setKit("box")}
                >
                  Mail a Box
                </div>
              </div>
              <div style={{ margin: 10 }}>
                <div style={{ marginTop: 10, fontWeight: 500, fontSize: 18 }}>
                  Your shipping address
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>Full Name</div>
                    <Input placeholder={"First Last"} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>Address Line 1</div>
                    <Input placeholder={"Street Address, PO Box"} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>Apt, Suite, Unit, etc.</div>
                    <Input placeholder={"Apt, Suite, Unit, Building, Floor"} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 30,
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>City</div>
                    <Input placeholder={"City"} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>State</div>
                    <Select>
                      <MenuItem value="AK">AK</MenuItem>
                      <MenuItem value="AL">AL</MenuItem>
                      <MenuItem value="AR">AR</MenuItem>
                      <MenuItem value="AZ">AZ</MenuItem>
                      <MenuItem value="CA">CA</MenuItem>
                      <MenuItem value="CO">CO</MenuItem>
                      <MenuItem value="CT">CT</MenuItem>
                      <MenuItem value="DC">DC</MenuItem>
                      <MenuItem value="DE">DE</MenuItem>
                      <MenuItem value="FL">FL</MenuItem>
                      <MenuItem value="GA">GA</MenuItem>
                      <MenuItem value="IA">IA</MenuItem>
                      <MenuItem value="ID">ID</MenuItem>
                      <MenuItem value="IL">IL</MenuItem>
                      <MenuItem value="IN">IN</MenuItem>
                      <MenuItem value="KS">KS</MenuItem>
                      <MenuItem value="KY">KY</MenuItem>
                      <MenuItem value="LA">LA</MenuItem>
                      <MenuItem value="MA">MA</MenuItem>
                      <MenuItem value="MD">MD</MenuItem>
                      <MenuItem value="ME">ME</MenuItem>
                      <MenuItem value="MI">MI</MenuItem>
                      <MenuItem value="MN">MN</MenuItem>
                      <MenuItem value="MO">MO</MenuItem>
                      <MenuItem value="MS">MS</MenuItem>
                      <MenuItem value="MT">MT</MenuItem>
                      <MenuItem value="NC">NC</MenuItem>
                      <MenuItem value="ND">ND</MenuItem>
                      <MenuItem value="NE">NE</MenuItem>
                      <MenuItem value="NH">NH</MenuItem>
                      <MenuItem value="NJ">NJ</MenuItem>
                      <MenuItem value="NM">NM</MenuItem>
                      <MenuItem value="NV">NV</MenuItem>
                      <MenuItem value="NY">NY</MenuItem>
                      <MenuItem value="OH">OH</MenuItem>
                      <MenuItem value="OK">OK</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                      <MenuItem value="PA">PA</MenuItem>
                      <MenuItem value="RI">RI</MenuItem>
                      <MenuItem value="SC">SC</MenuItem>
                      <MenuItem value="SD">SD</MenuItem>
                      <MenuItem value="TN">TN</MenuItem>
                      <MenuItem value="TX">TX</MenuItem>
                      <MenuItem value="UT">UT</MenuItem>
                      <MenuItem value="VA">VA</MenuItem>
                      <MenuItem value="VT">VT</MenuItem>
                      <MenuItem value="WA">WA</MenuItem>
                      <MenuItem value="WI">WI</MenuItem>
                      <MenuItem value="WV">WV</MenuItem>
                      <MenuItem value="WY">WY</MenuItem>
                    </Select>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: 200,
                      marginRight: 20
                    }}
                  >
                    <div>Zip Code</div>
                    <Input placeholder={"Zip Code"} />
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => this.sellingRules()}
              id="next"
              style={{
                backgroundColor: "#a1a1a1",
                padding: 10,
                borderRadius: 5,
                minWidth: 100,
                height: 20,
                textAlign: "center"
              }}
            >
              NEXT
            </div>
          </div>
        </div>
      </div>
    );
  }

  setKit(type) {
    if (type === "email") {
      this.setState({
        kit: "email"
      });
    } else {
      this.setState({
        kit: "box"
      });
    }
  }

  sellingRules() {
    window.location.href = "/sell/rules/" + this.state.kit;
  }
}
