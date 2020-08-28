import React from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import "./css/Home.css";
import * as firebase from "firebase";
import ClipLoader from "react-spinners/ClipLoader";
import Close from "./images/close.png";
import randomizeArray from "./global_methods/randomizeArray";
import SignInOnlyModal from "./SignInOnlyModal";
import Money from "./images/money.svg";
import Shop from "./images/shop.svg";
import Delivery from "./images/delivery.svg";
import "react-chatbox-component/dist/style.css";
import Chat from "./Chat";
import ItemScroller from "./ItemScroller";
import ItemModal from "./ItemModal";
import Treasure from "./images/treasureGIMP.png";

export default class Home extends React.Component {
  citiesList = ["Austin, TX"];
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      loaded: false,
      items: [],
      modal: null,
      addingToCart: false,
      addressModal: false,
      width: 0,
      height: 0,
      modalPictureIndex: 0,
    };

    // If we're signed in, sign us out.
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          window.location.reload();
        });
    }
    const categoryList = [
      "Art & Decoration",
      "Home",
      "Books",
      "Electronics",
      "Toys & Games",
      "Garden",
      "Sports & Hobbies",
    ];

    // const categoryList = ["Test", "Art & Decoration"];

    const firebaseCats = firebase.firestore().collection("Categories");
    var i_index = 0;
    var itemArr = [];
    for (var i = 0; i < categoryList.length; i++) {
      firebaseCats
        .doc(categoryList[i])
        .collection("All")
        .where("location", "==", "Austin, TX")
        .limit(30)
        .get()
        .then((allItems) => {
          i_index++;
          var allItemsDocs = allItems.docs;
          randomizeArray(allItemsDocs);

          if (allItems.empty) {
            this.setState({
              items: itemArr,
              loaded: true,
              modal: null,
              modalPictureIndex: 0,
            });
          }
          for (var j = 0; j < allItemsDocs.length; j++) {
            const itemData = allItemsDocs[j].data();
            // See if the search matches
            itemArr.push(itemData);
            // Find a way to render all the items here

            if (
              j === allItemsDocs.length - 1 &&
              i_index === categoryList.length - 1
            ) {
              // itemArr = randomizeArray(itemArr);
              this.setState({
                items: itemArr,
                loaded: true,
                modal: null,
                modalPictureIndex: 0,
              });
            }
          }
        });
    }
  }

  render() {
    console.log(!this.state.loaded);
    if (!this.state.loaded) {
      return (
        <div
          style={{
            position: "fixed",
            left: "45vw",
            top: 200,
          }}
        >
          <ClipLoader size={150} color={"#123abc"} loading={true} />
        </div>
      );
    }
    // Signed in? Go ahead and set the city.
    if (firebase.auth().currentUser) {
      localStorage.setItem("city", "Austin, TX");
      window.location.reload();
    }

    return (
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        <Chat />

        {this.state.profile && (
          <SignInOnlyModal
            redirectUrl={"/"}
            closeModal={() => this.closeModal()}
          />
        )}
        {this.state.addressModal && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center"
            }}
          >
            <div
              onClick={() => this.closeModal()}
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
                zIndex: 99,
                width: "100vw",
                height: "100vh",
                position: "fixed",
              }}
            ></div>
            <div
              style={{
                width: "60vw",
                borderRadius: 5,
                height: "80vh",
                top: 30,
                backgroundColor: "#f5f5f5",
                position: "fixed",
                zIndex: 100,
                opacity: 1,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <img
                    id="close"
                    onClick={() => this.closeModal()}
                    src={Close}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 15,
                      marginRight: 15,
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "5vh",
                    marginBottom: "5vh",
                    fontFamily: "Gill Sans",
                  }}
                >
                  Enter your city or zip to check availability
                </div>
                <PlacesAutocomplete
                  loading={(loaded) => this.loading(loaded)}
                  activeButton={false}
                  modal={this.state.tempModal}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.modal && (
          <ItemModal
            addingToCart={this.state.addingToCart}
            item={this.state.modal}
            closeModal={() => this.closeModal()}
            addToCart={(item) => this.addToCart(item)}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#e8e8e8",
            borderBottomStyle: "solid",
            width: "100vw",
          }}
        >
          <div
            id="bar"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Pridi",
                fontWeight: 700,
                marginLeft: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
                color: "#426CB4",
              }}
            >
              Tate's
            </div>
            <div
              style={{
                fontFamily: "Pridi",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 32,
                color: "#AF7366",
                marginLeft: 5,
              }}
            >
              Crate
            </div>
            <img
              style={{ width: 50, height: 50, marginLeft: 20 }}
              src={Treasure}
            ></img>
          </div>
          <div style={{ width: "100%" }}></div>
          {firebase.auth().currentUser && (
            <div
              id="become-collector"
              onClick={() =>
                this.setState({
                  profile: true,
                })
              }
              style={{
                minWidth: 100,
                fontWeight: 500,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Sign in
            </div>
          )}
          <div
            id="become-collector"
            onClick={() => (window.location.href = "/help/?header=fdc")}
            style={{
              minWidth: 100,
              fontWeight: 500,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 16,
              textAlign: "center",
              marginRight: 20,
              fontFamily: "Gill Sans",
            }}
          >
            About
          </div>
        </div>
        <div
          style={{
            height: "30vh",
            width: "100vw",
            backgroundColor: "#ffffff",
            paddingTop: 10,
            paddingBottom: 20,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            id="buy-sell-title"
            style={{
              fontFamily: "Gill Sans",

              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 0.1,
              marginTop: "0.5vh",
              textAlign: "center",
            }}
          >
            Cheap items, at your doorstep
          </div>
          <div
            style={{
              marginTop: "2vh",
              fontSize: 16,
              textAlign: "center",
              fontFamily: "Gill Sans",
            }}
          >
            As many items as you want, delivered to you the next morning for a
            flat $2 order fee.
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlacesAutocomplete
              loading={(loaded) => this.loading(loaded)}
              activeButton={true}
              modal={null}
            />
          </div>
        </div>

        <ItemScroller
          title={"Items Near Austin"}
          itemPage={(item) => this.itemPage(item)}
          mobile={false}
          items={this.state.items}
          width={this.state.width}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70vw",
            marginLeft: "15vw",
            marginTop: "7vh",
          }}
        >
          <div className="home1">
            <img src={Money} style={{ width: 60, height: 60 }}></img>
            <div className="home2">Price Drops</div>
            <div className="home3">
              We drop the prices of random items every 3 hours, up to 90%! We're
              stupid cheap.
            </div>
          </div>

          <div className="home1">
            <img src={Shop} style={{ width: 60, height: 60 }}></img>

            <div className="home2">New Items</div>
            <div className="home3">
              We add new items daily. Check back often to find them.
            </div>
          </div>
          <div className="home1">
            <img src={Delivery} style={{ width: 60, height: 60 }}></img>

            <div className="home2">Lightning Delivery</div>
            <div className="home3">
              Your entire order, delivered to your doorstep the next morning for
              a $2 order fee.
            </div>
          </div>
        </div>
        <div style={{ height: "10vh" }}></div>
      </div>
    );
  }

  loading(loaded) {
    this.setState({
      loaded: loaded,
    });
  }

  closeModal() {
    this.setState({
      profile: false,
      modal: false,
      logout: false,
      email: false,
      newUser: false,
      retUser: false,
      addressModal: false,
      tempModal: null,
      modalPictureIndex: 0,
    });
  }

  addToCart(modal) {
    // We have to make sure they are close enough for delivery first. Make them put in their address with a modal.
    this.setState({
      addressModal: true,
      modal: false,
      modalPictureIndex: 0,
      tempModal: modal,
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

  updateCity(city) {
    if (city === "" || !this.citiesList.includes(city)) {
      alert("Invalid city");
      return;
    }
    window.localStorage.setItem("city", city);
    window.location.href = "/";
  }

  showProfileModal() {
    this.setState({
      profile: true,
      logout: false,
    });
  }

  search() {}

  itemPage(item) {
    this.setState({
      modal: item,
    });
  }

  startShopping() {
    var email = document.getElementById("email").value;
    if (email) {
      email = email.toLowerCase();
    }

    if (!this.checkEmail(email)) {
      return;
    }
    this.login();
  }

  checkEmail(email) {
    if (!email) {
      alert("Bad email");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("Bad email");
    return false;
  }

  login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    console.log(email);
    console.log(pass);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((r) => {
        firebase
          .firestore()
          .collection("Users")
          .where("email", "==", email)
          .get()
          .then((myData) => {
            const data = myData.docs[0].data();
            localStorage.setItem("city", data.city);
            this.state.logout = false;
            this.state.email = false;
            this.state.newUser = false;
            this.state.retUser = false;
            this.state.profile = false;
            window.location.reload();
          });
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}
