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
      totalItemPrice: 0,
      res: null,
      count: 0,
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={() => this.reset()}
              style={{
                backgroundColor: "#f1f1f1",
                marginTop: 20,
                marginRight: 20,
              }}
            >
              RESET
            </Button>
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
            <Button
              onClick={() => this.next()}
              style={{
                backgroundColor: "#f1f1f1",
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              NEXT
            </Button>
          </div>

          {/* <div style={{ marginTop: 50 }}>{"Result: " + this.state.res}</div> */}
          {this.state.count == 0 && (
            <div style={{ marginTop: 10 }}>{"Average: " + "0"}</div>
          )}
          {this.state.count != 0 && (
            <div style={{ marginTop: 10 }}>
              {"Average: " + parseInt(this.state.total / this.state.count)}
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            {"Total: " + parseInt(this.state.totalItemPrice)}
          </div>
          <div style={{ marginTop: 10 }}>
            {"Pay: " + parseInt(this.state.totalItemPrice * 0.25)}
          </div>
          <Input style={{ marginTop: 30 }} id="total-add" type="number" />
          <Button
            onClick={() => this.addToTotal()}
            style={{
              backgroundColor: "#f1f1f1",
              marginTop: 30,
              marginLeft: 0,
            }}
          >
            Custom add to total
          </Button>
          <Button
            onClick={() => this.resetAll()}
            style={{
              backgroundColor: "#f1f1f1",
              marginTop: 60,
              marginLeft: 0,
            }}
          >
            Reset ALL
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

  reset() {
    document.getElementById("item").value = "";
    this.setState({
      res: null,
      total: 0,
      count: 0,
      loading: false,
    });
  }

  resetAll() {
    document.getElementById("item").value = "";
    this.setState({
      res: null,
      totalItemPrice: 0,
      total: 0,
      count: 0,
      loading: false,
    });
  }

  next() {
    this.setState({
      totalItemPrice:
        this.state.totalItemPrice +
        parseInt(this.state.total / this.state.count),
      res: null,
      total: 0,
      count: 0,
      loading: false,
    });
  }

  addToTotal() {
    const add = document.getElementById("total-add").value;
    if (!add) {
      return;
    }
    console.log(add);
    this.setState({
      totalItemPrice: parseInt(this.state.totalItemPrice) + parseInt(add),
    });
    document.getElementById("total-add").value = "";
  }
}
