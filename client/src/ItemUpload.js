import React from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClipLoader from "react-spinners/ClipLoader";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ReactCrop from "react-image-crop";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";

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
      sub_category: "",
      crop: {
        unit: "px",
        width: 220,
        height: 200,
      },
      croppedImgUrl: "",
      croppedImgFile: "",
      currentKeywords: [],
      keyword: "",
    };
  }

  render() {
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
        },
      },
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
            <div>
              <FormControl style={{ maxWidth: 200, minWidth: 200 }}>
                <Input
                  placeholder={"Keywords (Pick 5)"}
                  style={{ backgroundColor: "#f8f8f8", padding: 5 }}
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      this.handleChange(e);
                    }
                  }}
                  MenuProps={MenuProps}
                  id="select_keywords"
                  multiple={true}
                  value={this.state.keyword}
                  onChange={(e) => this.updateInput(e)}
                ></Input>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {this.state.currentKeywords.map((value) => {
                    return (
                      <Chip key={value} label={value} style={{ margin: 2 }} />
                    );
                  })}
                </div>
              </FormControl>
            </div>
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

  handleChange(e) {
    if (this.state.currentKeywords.length >= 5) {
      return;
    }
    const word = document.getElementById("select_keywords").value.trim();
    const temp = this.state.currentKeywords;
    temp.push(word);
    this.setState({
      currentKeywords: temp,
      keyword: "",
    });
  }

  updateInput(e) {
    const word = e.target.value.toLowerCase().trim();
    this.setState({
      keyword: word,
    });
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
    // Add the item to the shop
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
              sub_categories: this.state.currentKeywords,
              description: this.state.description,
              seller: this.state.sellerStripeId,
              uid: number,
              poster_uid: "uid1",
            })
            .then(() => {
              // Add it to the users items sold so we can pay them
              firebase
                .firestore()
                .collection("Users")
                .where("stripe_user_id", "==", this.state.sellerStripeId)
                .get()
                .then((me) => {
                  const data = me.docs[0].data();
                  const sales = data.sales;
                  const thisSale = {
                    title: this.state.title,
                    original_price: parseInt(this.state.price),
                    location: localStorage.getItem("city"),
                    pictures: [a],
                    category: this.state.category,
                    sub_categories: this.state.currentKeywords,
                    description: this.state.description,
                    seller: this.state.sellerStripeId,
                    uid: number,
                    poster_uid: "uid1",
                    paid: false,
                  };
                  const newSales = sales.concat(thisSale);

                  firebase
                    .firestore()
                    .collection("Users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                      sales: newSales,
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
