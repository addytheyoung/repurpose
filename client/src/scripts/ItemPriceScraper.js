import React from "react";
import api from "../api";
import ClipLoader from "react-spinners/ClipLoader";

import { Input, Button } from "@material-ui/core";

export default class ItemPriceScraper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      total: 0,
    };
  }
  render() {
    return (
      <div>
        {this.state.loading && (
          <div
            style={{
              position: "absolute",
              left: "45vw",
              top: 200,
            }}
          >
            <ClipLoader
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5vh",
          }}
        >
          <Input
            id="item"
            placeholder={"Item"}
            style={{ width: "50vw", height: 100 }}
          />
          <Button
            onClick={() => this.scrapeItem()}
            style={{ backgroundColor: "#f1f1f1", marginTop: 20 }}
          >
            GET PRICE
          </Button>
        </div>
      </div>
    );
  }

  scrapeItem() {
    this.setState({
      loading: true,
    });
    const item = document.getElementById("item").value;
    console.log(item);
    api.scrapeForPrices(item).then((res) => {
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
      console.log(avg);
      this.setState({
        loading: false,
      });
    });
  }
}
