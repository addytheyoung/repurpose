import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import * as firebase from "firebase";
import api from "./api";

export default class SingleImageUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  uploadSingleFile(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  upload(e) {
    e.preventDefault();
    const contact = document.getElementById("contact").value;
    const more = document.getElementById("more").value;
    if (!contact) {
      alert("Please enter your email!");
      return;
    }
    //Upload the file
    const number = this.randomNumber(30);
    const itemRef = firebase
      .storage()
      .ref()
      .child("whats_the_price")
      .child(number);

    if (this.state.file) {
      itemRef
        .put(this.state.file)
        .then(() => {
          api.sendEmail(
            "andrew@collection.deals",
            "File uploaded for guessing!\n Number: " +
              number +
              "\nContact email: " +
              contact +
              "\nMore: " +
              more
          );
          console.log(this.state.file);
          this.setState({
            file: null,
          });
          document.getElementById("file").value = null;
          document.getElementById("more").value = null;
          alert("We'll reach out soon with an offer.");
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      api.sendEmail(
        "andrew@collection.deals",
        "\nMore: " + more + "\nContact email: " + contact
      );
      document.getElementById("more").value = null;
      alert("We'll reach out soon with an offer.");
    }
  }

  render() {
    let imgPreview;
    if (this.state.file) {
      imgPreview = (
        <img style={{ maxWidth: 100 }} src={this.state.file} alt="" />
      );
    }
    return (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Input
            style={{ marginTop: 5, marginBottom: 5, width: 300 }}
            id="contact"
            placeholder="Email or phone"
          ></Input>
        </div>
        <div
          style={{ marginTop: 5, marginBottom: 5 }}
          className="form-group preview"
        >
          {imgPreview}
        </div>

        <div style={{ marginTop: 5, marginBottom: 5 }} className="form-group">
          <Input
            style={{ width: 300 }}
            id="file"
            type="file"
            className="form-control"
            onChange={this.uploadSingleFile}
          />
        </div>
        <div style={{ marginTop: 5, marginBottom: 5 }}>
          <Input
            id="more"
            style={{ width: 300 }}
            multiline
            placeholder="More info (Optional. For fashion, brand is required)"
          ></Input>
        </div>

        <Button
          style={{ marginTop: 10 }}
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.upload}
        >
          Upload
        </Button>
      </form>
    );
  }

  randomNumber(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
