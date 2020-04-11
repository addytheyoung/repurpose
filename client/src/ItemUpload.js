import React from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClipLoader from "react-spinners/ClipLoader";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropTest from "./CropTest";

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
          sellerStripeId: data.seller,
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
      city: "",
      crop: {
        unit: "px",
        width: 220,
        height: 200,
      },
      croppedImgUrl: "",
      croppedImgFile: "",
    };
  }

  render() {
    const crop = {
      aspect: 16 / 9,
    };
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
            <Camera
              isImageMirror={false}
              idealFacingMode={"environment"}
              onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)}
            />

            {this.state.picture && (
              <CropTest
                setCroppedImg={(croppedImgUrl) =>
                  this.setCroppedImg(croppedImgUrl)
                }
                picture={this.state.picture}
              />
            )}
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
              onChange={(e) => this.changeValue(e, "sellerStripeId")}
              value={this.state.sellerStripeId}
              placeholder={"Seller Stripe id"}
            />
          </div>
          {/* <div>
            <Input
              value={this.state.id}
              defaultValue={this.state.id}
              placeholder={"My email / ID"}
            />
          </div> */}

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
            id="submit"
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
          <div style={{ height: 100 }}></div>
        </div>
      </div>
    );
  }

  setCroppedImg(croppedImgUrl) {
    this.setState({
      croppedImgFile: croppedImgUrl,
    });
  }

  setCrop(crop) {
    this.setState({ crop });
  }

  changeValue(e, type) {
    this.setState({
      [type]: e.target.value,
    });
  }

  uploadItem() {
    // if (!this.state.title.trim()) {
    //   alert("Title");
    //   return;
    // } else if (!this.state.price.trim()) {
    //   alert("Price");
    //   return;
    // } else if (!this.state.category) {
    //   alert("Category");
    //   return;
    // } else if (!this.state.sellerStripeId) {
    //   alert("Seller stripe id");
    //   return;
    // } else if (!this.state.croppedImgUrl) {
    //   alert("Picture");
    //   return;
    // }

    if (!this.state.croppedImgFile) {
      alert("Picture");
      return;
    }

    const number = this.randomNumber(30);
    const itemRef = firebase.storage().ref().child("item_images").child(number);
    itemRef
      .put(this.state.croppedImgFile)
      .then((a) => {
        const download = itemRef.getDownloadURL();
        download.then((a) => {
          console.log(a);

          firebase
            .firestore()
            .collection("Categories")
            .doc(this.state.category)
            .collection("All")
            .doc(number)
            .set({
              title: this.state.title,
              original_price: parseInt(this.state.price),
              location: localStorage.getItem("city"),
              pictures: [a],
              category: this.state.category,
              description: this.state.description,
              seller: this.state.sellerStripeId,
              uid: number,
              poster_uid: "uid1",
            })
            .then(() => {
              this.setState({
                title: "",
                price: "",
                picture: "",
                category: "",
                description: "",
                number: "",
              });
            });
        });
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  handleTakePhoto(dataUri) {
    // Open up the crop tool
    this.setState({
      picture: dataUri,
    });
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
