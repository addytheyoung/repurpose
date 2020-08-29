import React, { Component } from "react";
import { ChatBox } from "react-chatbox-component";
import "./css/Chat.css";
import Close from "./images/close.png";
import { Input } from "@material-ui/core";
import Send from "./images/send.svg";
import * as firebase from "firebase";
import api from "./api";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: true,
      messages: [],
      loaded: false,
      chatId: null,
    };

    // No conversation, nothing to pull
    this.state.loaded = true;
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    if (this.state.minimized) {
      return (
        <div
          onClick={() => this.openChat(true)}
          id="minimized-chat"
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            right: "5vw",
            bottom: "0vh",
            height: "3.5vh",
            width: "20vw",
            backgroundColor: "rgb(66, 108, 180)",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            zIndex: 999,
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: 600,
              fontFamily: "Gill Sans",
            }}
          >
            Ask Us a Question
          </div>
        </div>
      );
    } else {
      return (
        <div
          id="maximized-chat"
          style={{
            borderWidth: 1,
            borderColor: "lightgrey",
            borderStyle: "solid",
            height: "60vh",
            width: "40vw",
            position: "fixed",
            right: "5vw",
            bottom: "0vh",
            backgroundColor: "#ffffff",
            borderRadius: 5,
            zIndex: 999,
          }}
        >
          <div
            id="chatscroll"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "54vh",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  id="close"
                  style={{
                    marginRight: "0.5vh",
                    marginTop: "0.5vh",
                    position: "fixed",
                  }}
                >
                  <img
                    onClick={() => this.openChat(false)}
                    src={Close}
                    style={{ width: "2vh", height: "2vh" }}
                  ></img>
                </div>
              </div>
            </div>

            <div style={{ height: "5vh" }}></div>
            <div
              style={{
                marginLeft: "5%",
                fontSize: 20,
                display: "flex",
                flexDirection: "row",
                marginRight: "5%",
                width: "90%",
                flexWrap: "wrap",
                fontWeight: 600,
                color: "grey",
              }}
            >
              <div>Call or text</div>
              <b
                style={{
                  color: "rgb(66, 108, 180)",
                  marginLeft: "1vw",
                  marginRight: "1vw",
                  fontWeight: 800,
                }}
              >
                903-203-1286
                <br />
              </b>
              <div>anytime for live help from us!</div>
            </div>

            <div style={{ marginLeft: "5%", fontSize: 15, marginTop: "3vh" }}>
              Or, send an email here. We reply in 12-24 hours!
            </div>

            <Input
              id="email-input"
              style={{
                width: "80%",
                height: "5vh",
                marginLeft: "10%",
                marginTop: "5vh",
                fontSize: 16,
              }}
              placeholder="Email"
            ></Input>
            <Input
              id="message-input"
              style={{
                width: "80%",
                // height: "25vh",
                marginLeft: "10%",
                fontSize: 16,
                textAlign: "start",
                marginTop: "3vh",
              }}
              rows={1}
              rowsMax={20}
              multiline
              placeholder="How can we help?"
            ></Input>
            <div
              style={{
                padding: 10,
                backgroundColor: "rgb(66, 108, 180)",
                color: "white",
                fontWeight: 600,
                textAlign: "center",
                width: "80%",
                marginLeft: "10%",
                marginTop: "5vh",
                borderRadius: 5,
              }}
              onClick={() => this.sendMessage()}
              id="send"
            >
              SEND
            </div>
          </div>
        </div>
      );
    }
  }

  openChat(open) {
    this.setState({
      minimized: !open,
    });
  }

  sendMessage() {
    const email = document.getElementById("email-input").value;
    const message = document.getElementById("message-input").value.trim();

    if (!this.checkEmail(email)) {
      return;
    }
    if (!message || message == "") {
      alert("Please put in a message!");
      return;
    }

    api.sendEmail(
      "andrew@collection.deals",
      "New message from: " + email + "\n\n" + message
    );
    alert("Message sent! We'll get back soon.");
    this.setState({
      minimized: true,
    });
    return;
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
}
