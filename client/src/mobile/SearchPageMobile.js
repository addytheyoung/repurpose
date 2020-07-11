import React from "react";
import Close from "../images/close.png";
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../css/CityPageMobile.css";
import FooterMobile from "./FooterMobile";

export default class SearchPageMobile extends React.Component {
  citiesList = ["Austin, TX", "Athens, TX"];

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center"
        }}
      >
        <div style={{ position: "fixed", bottom: 0 }}>
          <FooterMobile updateFilter={(a, b) => this.updateFilter(a, b)} />
        </div>
      </div>
    );
  }

  closeModal(e) {
    this.props.closePage();
  }
}
