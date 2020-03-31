import React from "react";
import HeaderBar from "./HeaderBar";
import * as firebase from "firebase";
import "./css/OrderKit.css";
import { Input, Select, MenuItem } from "@material-ui/core";

export default class OrderKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kit: "email",
      payment: "bank"
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
            <div style={{ marginTop: 30, fontSize: 22, fontWeight: 600 }}>
              What is the address of your items?
            </div>

            <div style={{ margin: 10, marginTop: 20 }}>
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
                  <div>Full Name</div>
                  <Input id="name" placeholder={"First Last"} />
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
                  <Input id="address1" placeholder={"Street Address, PO Box"} />
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
                  <Input
                    id="address2"
                    placeholder={"Apt, Suite, Unit, Building, Floor"}
                  />
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
                  <Input id="city" placeholder={"City"} />
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
                  <Select id="state">
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
                  <Input id="zip" placeholder={"Zip Code"} />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              onClick={() => this.sellingRules()}
              id="next"
              style={{
                marginTop: 20,
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                fontWeight: 600,
                minWidth: 150,
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

  setKit(type, id) {
    if (id === 1) {
      if (type === "email") {
        this.setState({
          kit: "email"
        });
      } else {
        this.setState({
          kit: "box"
        });
      }
    } else {
      this.setState({
        payment: type
      });
    }
  }

  sellingRules() {
    const name = document.getElementById("name").value.trim();
    // const address1 = document.getElementById("address1").value.trim();
    // const address2 = document.getElementById("address2").value.trim();
    // const city = document.getElementById("city").value.trim();
    // const state = document.getElementById("state").textContent.trim();
    // const zip = document.getElementById("zip").value.trim();

    // // Check name
    // const numSpaces = name.split(" ").length - 1;
    // if (numSpaces < 1) {
    //   alert("Please enter your full name");
    //   return;
    // }
    // if (address1 == "" || city == "" || state == "" || zip == "") {
    //   alert("Please put in your address");
    //   return;
    // }
    // if (zip.length !== 5) {
    //   alert("Invalid zip code");
    //   return;
    // }

    firebase
      .firestore()
      .collection("Users")
      .where("uid", "==", "uid1")
      .get()
      .then(a => {
        const user = a.docs[0].data();
        firebase
          .firestore()
          .collection("Users")
          .doc(user.email)
          .update({
            name: name
            // address1: address1,
            // address2: address2,
            // city: city,
            // state: state,
            // zip: zip,
            // kit: this.state.kit,
            // payment: this.state.payment
          })
          .then(() => {
            window.location.href =
              "/sell/rules/" + this.state.kit + "&" + this.state.payment;
          });
      });
  }
}
