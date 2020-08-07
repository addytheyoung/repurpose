import React, { Component } from "react";
import { ChatBox } from "react-chatbox-component";
import "./css/Chat.css";
import Close from "./images/close.png";
import { Input } from "@material-ui/core";
import Send from "./images/send.svg";
import * as firebase from "firebase";

export default class Chat extends Component {
  chatId = localStorage.getItem("chatId");

  constructor(props) {
    super(props);

    if (this.chatId) {
      // We have a conversation!
      firebase
        .firestore()
        .collection("Messages")
        .doc(this.chatId)
        .get()
        .then((conversation) => {
          const convData = conversation.data();
          const conv = [
            {
              sender: "me",
              text:
                "Hi! Message here, or call/text 903-203-1286 to talk to us! -Andrew",
            },
          ];
          for (var i = 0; i < convData.messages.length; i++) {
            conv.push(convData.messages[i]);
          }

          this.setState({
            loaded: true,
            messages: conv,
          });
        });
    } else {
      // No conversation, nothing to pull
      this.setState({
        loaded: true,
        messages: [
          {
            sender: "me",
            text:
              "Hi! Message here, or call/text 903-203-1286 to talk to us! -Andrew",
          },
        ],
      });
    }

    this.state = {
      minimized: true,
      messages: [],
    };
  }

  render() {
    if (this.state.minimized) {
      return (
        <div
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
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: 600,
            }}
            onClick={() => this.openChat(true)}
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
            height: "30vw",
            width: "25vw",
            position: "fixed",
            right: "5vw",
            bottom: "0vh",
            backgroundColor: "#ffffff",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "25vw",
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
                  style={{ marginRight: "1vh", marginTop: "1vh" }}
                >
                  <img
                    onClick={() => this.openChat(false)}
                    src={Close}
                    style={{ width: "3vh", height: "3vh" }}
                  ></img>
                </div>
              </div>
              {this.state.messages.map((message, index) => {
                if (message.sender == "me") {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          padding: 10,
                          backgroundColor: "rgb(66, 108, 180)",
                          borderRadius: 10,
                          color: "white",
                          marginTop: 10,
                          maxWidth: "60%",
                          marginLeft: 10,
                          fontSize: 13,
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          padding: 10,
                          backgroundColor: "#f3f3f3",
                          borderRadius: 10,
                          color: "black",
                          marginTop: 10,
                          maxWidth: "60%",
                          marginRight: 10,
                          fontSize: 13,
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div
            style={{
              height: "5vh",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Input
              id="message-input"
              style={{
                width: "80%",
                height: "100%",
                marginLeft: "5%",
                fontSize: 13,
              }}
              placeholder="What do you want to know?"
            ></Input>
            <div
              onClick={() => this.sendMessage()}
              id="send"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "2vw", height: "2vw", marginLeft: "1vw" }}
                src={Send}
              ></img>
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
    const message = document.getElementById("message-input").value;
    const id = this.randomNumber(20);

    // firebase.firestore().collection("Messages").
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
