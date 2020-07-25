import React from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";
import Close from "./images/close.png";

export default class SignInOnlyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: props.redirectUrl,
    };
  }

  render() {
    const singedin = !!firebase.auth().currentUser;
    const signedModal = !singedin && !this.state.newUser && !this.state.retUser;
    const path = window.location.pathname;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          // alignItems: "center"
        }}
      >
        <div
          onClick={(e) => this.closeModal(e)}
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
            width: "30vw",
            borderRadius: 5,
            height: "40vh",
            top: 30,
            backgroundColor: "#f5f5f5",
            position: "fixed",
            zIndex: 100,
            opacity: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                  width: 30,
                  height: 30,
                  marginTop: 20,
                  marginRight: 20,
                }}
              />
            </div>
            {signedModal && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>Sign in</div>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  style={{ maxWidth: "25vw", marginTop: "1vh" }}
                />
                <div
                  onClick={() => this.startShopping()}
                  id="start-shopping"
                  style={{
                    backgroundColor: "#426CB4",
                    borderRadius: 5,
                    padding: 10,
                    height: 30,
                    maxWidth: "90%",
                    color: "white",
                    fontWeight: 600,
                    marginTop: "5vh",
                    marginBottom: "1vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  START SHOPPING
                </div>
              </div>
            )}

            {!singedin && this.state.retUser && (
              <div>
                {" "}
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, marginTop: 20 }}>
                    Welcome back! What is your password?
                  </div>
                  <Input
                    id="pass"
                    type="password"
                    placeholder="Password"
                    style={{ width: 300, marginTop: 30 }}
                  />
                  <div
                    onClick={() => this.login()}
                    id="start-shopping"
                    style={{
                      backgroundColor: "#426CB4",
                      borderRadius: 5,
                      padding: 10,
                      height: 30,
                      maxWidth: "90%",
                      color: "white",
                      fontWeight: 600,
                      marginTop: "5vh",
                      marginBottom: "1vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    START SHOPPING
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  startShopping() {
    var email = document.getElementById("email").value;
    if (email) {
      email = email.toLowerCase();
    }
    if (!this.checkEmail(email)) {
      return;
    }
    var myUid = null;
    if (localStorage.getItem("tempUid")) {
      // We have a profile. Transfer the data
      myUid = localStorage.getItem("tempUid");
    } else {
      // We don't have a profile. Make a new one
    }

    firebase
      .firestore()
      .collection("Users")
      .where("email", "==", email)
      .get()
      .then((user) => {
        const user2 = user.docs;
        if (user2.length !== 0) {
          // Returning user
          this.setState({
            retUser: true,
            email: email,
          });
        } else {
          // New account, render that screen.
          alert(
            "Account not found. Please enter your address below to get started!"
          );
          this.props.closeModal();
        }
      });
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

  setCity() {
    this.setState({
      city: !this.state.city,
      searching: false,
    });
  }

  login() {
    const email = this.state.email;
    const pass = document.getElementById("pass").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((r) => {
        localStorage.setItem("city", "Austin, TX");
        this.state.logout = false;
        this.state.email = false;
        this.state.newUser = false;
        this.state.retUser = false;
        this.state.profile = false;
        window.location.href = this.state.redirectUrl;
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  showProfileModal() {
    this.setState({
      profile: true,
      searching: false,
      city: false,
      logout: false,
    });
  }

  closeModal(e) {
    console.log(this.props);
    this.props.closeModal();
  }
}
