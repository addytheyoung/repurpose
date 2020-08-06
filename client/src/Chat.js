import React, { Component } from "react";
import { ChatBox } from "react-chatbox-component";
import "./css/Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: true,
      messages: [
        {
          sender: "me",
          text:
            "Hi! Message here, or call/text 903-203-1286 to talk to us! -Andrew",
        },
        {
          sender: "customer",
          text: "How do I buy an item?",
        },
      ],
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
            height: "3vw",
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
          style={{
            position: "fixed",
            right: "5vw",
            bottom: "5vh",
            height: "20vw",
            width: "25vw",
            backgroundColor: "#ffffff",
            borderRadius: 5,
            overflowY: "scroll",
            overflowX: "hidden",
            borderWidth: 1,
            borderColor: "lightgrey",
            borderStyle: "solid",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                        fontSize: 12,
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
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        color: "black",
                        marginTop: 10,
                        maxWidth: "60%",
                        marginRight: 10,
                        fontSize: 12,
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
      );
    }
  }

  openChat(open) {
    this.setState({
      minimized: !open,
    });
  }
}
