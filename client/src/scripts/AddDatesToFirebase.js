import React from "react";
import * as firebase from "firebase";

export default class AddDatesToFirebase extends React.Component {
  constructor(props) {
    super(props);

    var dateJSON = { "6-1-2020": ["8:00 AM", "9:00 AM"] };

    var monthIndex = 6;
    while (monthIndex <= 9) {
      var dayIndex = 1;
      while (dayIndex <= 31) {
        const tempString = monthIndex + "-" + dayIndex + "-" + "2020";
        const tempArr = [
          "7:00 AM",
          "8:00 AM",
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "12:00 PM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
          "5:00 PM",
          "6:00 PM",
          "7:00 PM",
        ];
        dateJSON[tempString] = tempArr;
        dayIndex++;
      }
      monthIndex++;
    }
    console.log(dateJSON);

    firebase
      .firestore()
      .collection("Collectors")
      .doc("andrewtateyoung")
      .update(dateJSON)
      .then(() => {
        console.log("Success");
      });
  }

  render() {
    return <div>S</div>;
  }
}
