import React from "react";
import api from "./api";

export default class AndrewTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    api.postToFb("bottomtext").then((res) => {
      console.log(res);
    });
    return <div>d</div>;
  }
}
