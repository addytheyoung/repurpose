import React from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClipLoader from "react-spinners/ClipLoader";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import "./css/ItemUpload.css";

export default class ItemUpload extends React.Component {
  citiesList = ["Athens, TX"];

  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection("Collectors")
      .doc("1234")
      .get()
      .then((myData) => {
        const data = myData.data();
        this.setState({
          city: data.city,
          id: "1234",
          loaded: true,
        });
      });
    this.state = {
      loaded: false,
      title: "",
      price: "",
      picture: "",
      category: "",
      description: "",
      sellerStripeId: "",
      id: "1234",
      city: "",
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
        <div
          id="item-upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <div style={{ marginTop: 20 }}>Upload an item</div>
          <div>
            <Input
              onChange={(e) => this.changeValue(e, "title")}
              value={this.state.title}
              placeholder={"Title"}
            />
          </div>
          <div>
            <Input
              onChange={(e) => this.changeValue(e, "price")}
              value={this.state.price}
              placeholder={"Price"}
            />
          </div>
          <div>
            <Camera onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)} />
          </div>

          <div>
            <Input
              onChange={(e) => this.changeValue(e, "category")}
              value={this.state.category}
              placeholder={"Category"}
            />
          </div>
          <div>
            <Input
              onChange={(e) => this.changeValue(e, "description")}
              value={this.state.description}
              placeholder={"Description"}
            />
          </div>
          <div style={{ height: 30 }}></div>
          <div>
            <Input
              value={this.state.sellerStripeId}
              placeholder={"Seller Stripe id"}
            />
          </div>
          <div>
            <Input
              onChan
              value={this.state.id}
              defaultValue={this.state.id}
              placeholder={"My email / ID"}
            />
          </div>

          <div>
            <Autocomplete
              defaultValue={this.state.city}
              id="combo-box-demo"
              options={this.citiesList}
              getOptionLabel={(option) => option}
              style={{ width: 300 }}
              renderInput={(params) => (
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
            onClick={() => this.uploadItem()}
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
            }}
          >
            UPLOAD
          </div>
        </div>
      </div>
    );
  }

  changeValue(e, type) {
    this.setState({
      [type]: e.target.value,
    });
  }

  uploadItem() {
    this.setState({
      title: "",
      price: "",
      picture: "",
      category: "",
      description: "",
    });
  }

  handleTakePhoto(dataUri) {
    console.log(dataUri);
  }
}
