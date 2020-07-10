import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import "../css/Dialog.css";
import Close from "../images/close.png";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, categories } = props;

  const [checked, setChecked] = React.useState(categories);

  const handleChange = (index) => {
    var temp = [];
    for (var i = 0; i < checked.length; i++) {
      if (i == index) {
        temp.push(!checked[i]);
      } else {
        temp.push(checked[i]);
      }
    }
    setChecked(temp);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const clear = () => {
    setChecked([true, true, true, true, true, true, true, true, true, true]);
  };

  return (
    <Dialog
      fullScreen={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <img
          id="close"
          onClick={handleClose}
          src={Close}
          style={{
            width: "10vw",
            height: "10vw",
            marginTop: 40,
            marginRight: 40,
          }}
        />
      </div>
      <div
        style={{
          alignSelf: "center",
          textAlign: "center",
          marginTop: 30,
          fontWeight: 700,
          fontSize: 52,
        }}
      >
        Categories
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Art & Decoration"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[0]}
              onChange={() => handleChange(0)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Books"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[1]}
              onChange={() => handleChange(1)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {"Clothing, Shoes, & Accessories"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[2]}
              onChange={() => handleChange(2)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Electronics"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[3]}
              onChange={() => handleChange(3)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Home"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[4]}
              onChange={() => handleChange(4)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Garden"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[5]}
              onChange={() => handleChange(5)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Pet Supplies"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[6]}
              onChange={() => handleChange(6)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: "50vw",
              fontSize: 46,
              fontWeight: 600,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Sports & Hobbies"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[7]}
              onChange={() => handleChange(7)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: "50vw",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 46,
              fontWeight: 600,
            }}
          >
            {"Toys & Games"}
          </div>
          <div id="check">
            <Checkbox
              checked={checked[8]}
              onChange={() => handleChange(8)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </div>
      </div>

      <div
        id="clear"
        style={{
          backgroundColor: "#dae2f1",
          padding: 10,
          width: "25vw",
          height: "5vh",
          alignSelf: "center",
          textAlign: "center",
          fontSize: 46,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 50,
          fontWeight: 600,
          marginBottom: 50,
        }}
        onClick={() => clearContent(props, handleClose, clear)}
      >
        CLEAR
      </div>

      <div
        id="save"
        style={{
          backgroundColor: "#dae2f1",
          padding: 10,
          width: 100,
          alignSelf: "center",
          width: "25vw",
          height: "5vh",
          display: "flex",
          justifyContent: "center",
          fontSize: 46,
          textAlign: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 50,
          fontWeight: 600,
          marginBottom: 50,
        }}
        onClick={() => saveContent(props, checked, handleClose)}
      >
        SAVE
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function clearContent(props, handleClose, clear) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  clear();
  props.clearContent();
  handleClose();
}

function saveContent(props, saved, handleClose) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  props.changeCategory(saved);
  handleClose();
}

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div style={{ marginTop: "2vh" }}>
      <div
        onClick={handleClickOpen}
        id="price"
        style={{
          borderWidth: 3,
          borderRadius: 20,
          borderStyle: "solid",
          paddingTop: 10,
          paddingBottom: 10,
          minWidth: "50vw",
          minHeight: "5vh",
          fontWeight: 600,
          paddingLeft: 25,
          paddingRight: 25,
          borderColor: "#a1a1a1",
          fontSize: 42,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Category
      </div>
      <SimpleDialog
        categories={props.categories}
        clearContent={props.clearContent}
        changeCategory={props.changeCategory}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
