import React from "react";
import * as firebase from "firebase";
import { Input, MenuItem, Select, Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ClipLoader from "react-spinners/ClipLoader";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ReactCrop from "react-image-crop";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import api from "./api";
import "react-image-crop/dist/ReactCrop.css";
import CropTest from "./CropTest";

import "./css/ItemUpload.css";

export default class ItemUpload extends React.Component {
  sellerID = "qMueYTZMubazxdTNVrW1wvkVwOH3";
  citiesList = ["Austin, TX"];

  constructor(props) {
    super(props);

    // THIS SHOULD CHANGE WHEN I AM UPLOADING OTHER USERS ITEMS
    firebase
      .firestore()
      .collection("Collectors")
      .doc("1234")
      .get()
      .then((myData) => {
        const data = myData.data();
        if (data.seller) {
          this.setState({
            city: data.city,
            sellerStripeId: this.sellerID,
            loaded: true,
          });
        } else {
          this.setState({
            city: data.city,
            sellerStripeId: "donate",
            loaded: true,
          });
        }
      })
      .catch((e) => {
        alert(e.message);
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
      res: 0,
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
      brand: "",
      size: "",
      gender: "",
      type: "",
      storageID: "",
      furniture: "false",
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
    if (firebase.auth().currentUser.uid != "q2SYPrnJwNhaC3PcMhE3LTZ1AIv1") {
      this.setState({
        loaded: true,
      });
      return <div>Wrong user</div>;
    }
    return (
      <div style={{ overflowX: "hidden" }}>
        <div
          id="item-upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <div>
            <div id="camera" style={{ width: "100vw" }}>
              <Camera
                isImageMirror={false}
                idealFacingMode={"environment"}
                onTakePhoto={(dataUri) => this.handleTakePhoto(dataUri)}
              />
            </div>

            {this.state.picture && (
              <CropTest
                setCroppedImg={(croppedImgUrl) =>
                  this.setCroppedImg(croppedImgUrl)
                }
                picture={this.state.picture}
              />
            )}
          </div>
          <div style={{ marginTop: 20 }}>Upload an item</div>
          <div>
            <Input
              style={{
                width: "80vw",
                fontSize: 20,
                height: 120,
                marginTop: 10,
              }}
              onChange={(e) => this.changeValue(e, "title")}
              value={this.state.title}
              placeholder={"Title"}
            />
          </div>
          <div>
            <Input
              style={{
                fontSize: 20,
                height: 120,
                width: "80vw",
                marginTop: 10,
              }}
              onChange={(e) => this.changeValue(e, "price")}
              value={this.state.price}
              placeholder={"Price"}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              style={{
                width: "50vw",
                height: 120,
                marginTop: 10,
                height: 120,
                fontSize: 20,
                display: "flex",
                flexDirection: "column",
              }}
              id="category2"
              defaultValue={"Category"}
              onChange={(e) =>
                this.setState({
                  category: e.target.value,
                })
              }
            >
              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Art & Decoration"}
              >
                Art & Decoration
              </MenuItem>

              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Books"}>
                Books
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Clothing, Shoes, & Accessories"}
              >
                {"Clothing, Shoes, & Accessories"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Electronics"}
              >
                Electronics
              </MenuItem>

              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Home"}>
                {"Home"}
              </MenuItem>

              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Garden"}>
                {"Garden"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Pet Supplies"}
              >
                {"Pet Supplies"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Sports & Hobbies"}
              >
                {"Sports & Hobbies"}
              </MenuItem>
              <MenuItem style={{ marginTop: 5, height: 50 }} value={"Test"}>
                {"Test"}
              </MenuItem>
              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Toys & Games"}
              >
                {"Toys & Games"}
              </MenuItem>

              <MenuItem
                style={{ marginTop: 5, height: 50 }}
                value={"Everything Else"}
              >
                {"Everything Else"}
              </MenuItem>
            </Select>
          </div>

          {this.state.category == "Home" && (
            <div
              style={{
                height: 150,
                width: "80vw",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>Furniture?</div>
              <Select
                style={{
                  width: "50vw",
                  height: 120,
                  marginTop: 10,
                  height: 120,
                  fontSize: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
                id="category3"
                defaultValue={"false"}
                onChange={(e) =>
                  this.setState({
                    furniture: e.target.value,
                  })
                }
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"false"}>
                  {"false"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"true"}>
                  {"true"}
                </MenuItem>
              </Select>
            </div>
          )}

          {this.state.category == "Clothing, Shoes, & Accessories" && (
            <div style={{ height: 450, width: "80vw" }}>
              <Input
                style={{ width: "80vw", height: 120, marginTop: 10 }}
                onChange={(e) => this.changeValue(e, "brand")}
                value={this.state.brand}
                placeholder={"Brand"}
              />
              <Input
                style={{ width: "80vw", height: 120, marginTop: 10 }}
                onChange={(e) => this.changeValue(e, "size")}
                value={this.state.size}
                placeholder={"Size"}
              />
              <Select
                style={{ width: "80vw", height: 120, marginTop: 10 }}
                value={this.state.type}
                placeholder={"Type"}
                onChange={(e) =>
                  this.setState({
                    type: e.target.value,
                  })
                }
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"female"}>
                  {"Shirt"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"male"}>
                  {"Pants"}
                </MenuItem>
              </Select>
              <Select
                style={{ width: "80vw", height: 120, marginTop: 10 }}
                value={this.state.gender}
                placeholder={"Gender"}
                onChange={(e) =>
                  this.setState({
                    gender: e.target.value,
                  })
                }
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"female"}>
                  {"F"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"male"}>
                  {"M"}
                </MenuItem>
              </Select>
            </div>
          )}
          <div>
            <Input
              style={{ width: "80vw", height: 50, marginTop: 10 }}
              onChange={(e) => this.changeValue(e, "description")}
              value={this.state.description}
              placeholder={"Description"}
            />
            <div>
              <FormControl style={{ maxWidth: 200, minWidth: 200 }}>
                <Input
                  placeholder={"Keywords (Pick 5)"}
                  style={{
                    backgroundColor: "#f8f8f8",
                    padding: 5,
                    width: "80vw",
                    height: 50,
                    marginTop: 10,
                  }}
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
              style={{ width: "80vw", height: 50, marginTop: 10 }}
              onChange={(e) => this.changeValue(e, "sellerStripeId")}
              value={this.state.sellerStripeId}
              placeholder={"Seller ID"}
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
              style={{ width: "80vw", height: 50, marginTop: 10 }}
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
            />
          </div>
          <div>
            <Input
              style={{
                width: "80vw",
                fontSize: 20,
                height: 120,
                marginTop: 10,
              }}
              onChange={(e) => this.changeValue(e, "storageID")}
              value={this.state.storageID}
              placeholder={"Storage ID"}
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
              fontSize: 20,
              fontWeight: 600,
              width: "50vw",
              height: 120,
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            UPLOAD
          </div>
          <div>
            <Input
              id="item"
              placeholder={"Item"}
              style={{ width: "50vw", height: 100, marginTop: 50 }}
            />
            <Button
              onClick={() => this.scrapeItem()}
              style={{
                backgroundColor: "#f1f1f1",
                fontWeight: 600,
                fontSize: 18,
                padding: 20,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              GET PRICE
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
              }}
            >
              <div>{"Price: " + parseInt(this.state.res)}</div>
              <div>{"Pay: " + parseInt(parseInt(this.state.res) * 0.25)}</div>
            </div>
          </div>
          <div style={{ height: 100 }}></div>
        </div>
      </div>
    );
  }

  scrapeItem() {
    this.setState({
      loading: true,
    });
    const item = document.getElementById("item").value;
    if (!item) {
      return;
    }
    console.log(item + " used");
    api.scrapeForPrices(item + " used").then((res) => {
      console.log(res);
      var min = 1000000;
      var max = -1;
      for (var i = 0; i < res.length; i++) {
        var string = res[i];
        string = string.substring(1, string.length - 1);
        const val = parseFloat(string);
        if (val > max) {
          max = val;
        }
        if (val < min) {
          min = val;
        }
      }
      for (var i = 0; i < res.length; i++) {
        var string = res[i];
        string = string.substring(1, string.length - 1);
        const val = parseFloat(string);
        if (val == max) {
          res.splice(i, 1);
          i--;
        }
        if (val == min) {
          res.splice(i, 1);
          i--;
        }
      }
      console.log(res);

      var avg = -1;
      for (var i = 0; i < res.length; i++) {
        var string = res[i];
        string = string.substring(1, string.length - 1);
        const val = parseFloat(string);
        avg += val;
      }

      avg /= res.length;
      avg = parseInt(avg);
      var total = this.state.total;
      total += avg;
      console.log(avg);
      this.setState({
        loading: false,
        res: avg,
        total: total,
        count: this.state.count + 1,
      });
    });
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
    const category = document.getElementById("category2").innerText;
    if (!this.state.price.trim()) {
      alert("Price");
      return;
    } else if (!category || category.trim() == "") {
      alert("Category");
      return;
    } else if (!this.state.croppedImgFile) {
      alert("Picture");
      return;
    }
    if (category == "Clothing, Shoes, & Accessories") {
      // Check the brand, size, gender
      if (!this.state.gender) {
        alert("Gender");
        return;
      } else if (!this.state.brand) {
        alert("Brand");
        return;
      } else if (!this.state.size) {
        alert("Size");
        return;
      }
    }
    this.setState({
      loaded: false,
    });

    const number = this.randomNumber(30);
    // Add the item to the shop
    const itemRef = firebase.storage().ref().child("item_images").child(number);
    itemRef
      .put(this.state.croppedImgFile)
      .then((a) => {
        const download = itemRef.getDownloadURL();
        download
          .then((a) => {
            console.log(a);
            firebase
              .firestore()
              .collection("Categories")
              .doc(category)
              .get()
              .then((cat) => {
                if (cat.exists) {
                  firebase
                    .firestore()
                    .collection("Categories")
                    .doc(category)
                    .collection("All")
                    .doc(number)
                    .set({
                      title: this.state.title,
                      original_price: parseInt(this.state.price),
                      location: localStorage.getItem("city"),
                      pictures: [a],
                      category: category,
                      brand: this.state.brand,
                      type: this.state.type,
                      size: this.state.size,
                      gender: this.state.gender,
                      sub_categories: this.state.currentKeywords,
                      description: this.state.description,
                      seller: this.state.sellerStripeId,
                      storageID: this.state.storageID,
                      uid: number,
                      poster_uid: firebase.auth().currentUser.uid,
                      new_item: true,
                      furniture: this.state.furniture,
                    })
                    .then(() => {
                      // Add it to the users items sold so we can pay them
                      this.setState({
                        loaded: true,
                        title: "",
                        price: "",
                        picture: "",
                        category: "",
                        description: "",
                        furniture: "false",
                        number: "",
                        keyword: "",
                        currentKeywords: [],
                      });
                    })
                    .catch((e) => {
                      this.setState({
                        loaded: true,
                      });
                      alert(e.message);
                    });
                } else {
                  // Doesn't exist, make the category
                  firebase
                    .firestore()
                    .collection("Categories")
                    .doc(category)
                    .set({})
                    .then(() => {
                      firebase
                        .firestore()
                        .collection("Categories")
                        .doc(category)
                        .collection("All")
                        .doc(number)
                        .set({
                          title: this.state.title,
                          original_price: parseInt(this.state.price),
                          location: localStorage.getItem("city"),
                          pictures: [a],
                          category: category,
                          sub_categories: this.state.currentKeywords,
                          description: this.state.description,
                          seller: this.state.sellerStripeId,
                          storageID: this.state.storageID,
                          uid: number,
                          poster_uid: firebase.auth().currentUser.uid,
                          new_item: true,
                          furniture: this.state.furniture,
                        })
                        .then(() => {
                          // Add it to the users items sold so we can pay them
                          this.setState({
                            loaded: true,
                            title: "",
                            price: "",
                            picture: "",
                            category: "",
                            description: "",
                            number: "",
                            keyword: "",
                            currentKeywords: [],
                            furniture: "false",
                          });
                        })
                        .catch((e) => {
                          this.setState({
                            loaded: true,
                          });
                          alert(e.message);
                        });
                    })
                    .catch((e) => {
                      this.setState({
                        loaded: true,
                      });
                      alert(e.message);
                    });
                }
              })
              .catch((e) => {
                this.setState({
                  loaded: true,
                });
                alert(e.message);
              });
          })
          .catch((e) => {
            this.setState({
              loaded: true,
            });
            alert(e.message);
          });
      })
      .catch((e) => {
        this.setState({
          loaded: true,
        });
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
