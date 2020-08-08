import React, { Component } from "react";
import * as firebase from "firebase";
import { Input } from "@material-ui/core";

export default class ChatPage extends Component {
  constructor(props) {
    super(props);

    const q = window.location.search;
    const urlParams = new URLSearchParams(q);
    var chatId = urlParams.get("id");
    // var chatId = "1Noa75x3MjnHGRw211TF";
    firebase
      .firestore()
      .collection("Messages")
      .doc(chatId)
      .get()
      .then((chat) => {
        this.setState({
          loaded: true,
          chatData: chat.data().messages,
        });
      });

    this.state = {
      loaded: false,
      chatData: [],
      chatId: chatId,
    };
  }

  render() {
    if (!this.state.loaded) {
      return <div></div>;
    }
    return (
      <div style={{ height: "100vh", overflowY: "scroll" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.chatData.map((msg, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    color: msg.sender == "me" ? "black" : "green",
                    margin: "1vh",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div>
            <Input
              id="my-message-input"
              style={{ height: "5vh", width: "50vw", marginLeft: "1vh" }}
              placeholder="My response"
            />
            <div
              style={{
                backgroundColor: "#f6f6f6",
                padding: 10,
                borderRadius: 4,
              }}
              onClick={() => this.sendMessage()}
            >
              SEND
            </div>
          </div>
        </div>
      </div>
    );
  }

  sendMessage() {
    const message = document.getElementById("my-message-input").value;
    const allMessages = this.state.chatData;
    const messageObject = { sender: "me", text: message };
    allMessages.push(messageObject);
    firebase.firestore().collection("Messages").doc(this.state.chatId).update({
      messages: allMessages,
    });
  }
}
