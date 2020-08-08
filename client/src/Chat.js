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
    this.state.messages = [
      {
        sender: "me",
        text:
          "Hi! Message here, call/text 903-203-1286, or email andrew@collection.deals to talk to us! We take a few minutes to respond here.",
      },
    ];

    // Check database if they have sent a message and are waiting on a response
  }

  render() {
    console.log(this.state.loaded);
    if (!this.state.loaded) {
      return null;
    }

    const t = this;
    window.setInterval(function () {
      t.checkMessages();
    }, 4000);

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
                          maxWidth: "76%",
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
                height: "5vh",
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

  checkMessages() {
    if (
      !this.state.chatId ||
      this.state.messages[this.state.messages.length - 1].sender == "me"
    ) {
      return;
    }
    const chatId = this.state.chatId;
    firebase
      .firestore()
      .collection("Messages")
      .doc(chatId)
      .get()
      .then((chats) => {
        const messages = chats.data().messages;
        if (messages[messages.length - 1].sender == "me") {
          // I sent a message, show it.
          this.setState({
            messages: messages,
          });
        }
      });
  }

  openChat(open) {
    this.setState({
      minimized: !open,
    });
  }

  sendMessage() {
    const message = document.getElementById("message-input").value;
    document.getElementById("message-input").value = "";
    const chatId = this.state.chatId;
    const messageObject = { sender: "customer", text: message };
    const messages = this.state.messages;

    if (chatId) {
      // Current conversation
      const tempMessages = [];
      for (var i = 0; i < messages.length; i++) {
        tempMessages.push(messages[i]);
      }
      tempMessages.push(messageObject);

      this.setState({
        messages: tempMessages,
      });

      firebase.firestore().collection("Messages").doc(chatId).update({
        messages: tempMessages,
      });
    } else {
      // Make one! New convo
      const id = this.randomNumber(20);
      const messageObject = { sender: "customer", text: message };

      api.sendEmail(
        "andrew@collection.deals",
        '"' +
          message +
          '"' +
          "\n\n" +
          "New conversation: " +
          "https://collection.deals/chatpage/?id=" +
          id
      );

      firebase
        .firestore()
        .collection("Messages")
        .doc(id)
        .set({
          id: id,
          messages: [messageObject],
        })
        .then(() => {
          const tempMessages = [];
          for (var i = 0; i < this.state.messages.length; i++) {
            tempMessages.push(this.state.messages[i]);
          }
          tempMessages.push(messageObject);

          this.setState({
            messages: tempMessages,
            chatId: id,
          });
        });
    }
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
