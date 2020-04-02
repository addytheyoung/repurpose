import React from "react";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./css/BecomeCollector.css";
import * as firebase from "firebase";

export default class BecomeCollector extends React.Component {
  citiesList = ["Athens, TX"];

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginTop: 100,
            marginBottom: 30
          }}
        >
          What is your phone number?
        </div>
        <div>
          <Input
            id="phone"
            style={{ width: 300, marginBottom: 30 }}
            type="text"
            placeholder={"Phone number"}
          />
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginTop: 50,
            marginBottom: 30
          }}
        >
          What city do you live in?
        </div>
        <div>
          <Autocomplete
            id="combo-box-demo"
            options={this.citiesList}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="We add more cities every day!"
                label="City"
                variant="outlined"
                fullWidth
              />
            )}
            freeSolo={true}
            style={{ width: "300px" }}
          />
        </div>
        <div
          onClick={() => this.submit()}
          id="submit"
          style={{
            marginLeft: 10,
            padding: 10,
            borderRadius: 5,
            marginTop: 30,
            backgroundColor: "black",
            fontWeight: 600,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Submit
        </div>
      </div>
    );
  }

  submit() {
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("combo-box-demo").value.trim();

    if (!phone) {
      alert("Please enter a phone number");
    }
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    firebase
      .firestore()
      .collection("Collectors")
      .doc("123")
      .set({
        phone: phone,
        city: city
      })
      .then(() => {
        alert("Success! We'll reach out soon.");
        window.location.href = "/";
      });
  }
}
