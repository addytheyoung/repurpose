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
import { Select, MenuItem, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Down from "./images/down-arrow.png";
import "./css/Dialog.css";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const [checked, setChecked] = React.useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [clothing, setClothing] = React.useState(false);
  const [type, setType] = React.useState("all");
  const [gender, setGender] = React.useState("all");
  const [size, setSize] = React.useState("all");

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
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        style={{
          alignSelf: "center",
          textAlign: "center",
          marginTop: 30,
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        More
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
          {/* <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {"Art & Decoration"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {"Books"}
          </div> */}
        </div>
        <div
          id="clothing"
          onClick={() => setClothing(!clothing)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 100,
            marginRight: 100,
          }}
        >
          <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {"Clothing, Shoes, & Accessories"}
          </div>
          <img style={{ marginLeft: 10, width: 17, height: 17 }} src={Down} />
        </div>
        {clothing && (
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
              }}
            >
              <div style={{ width: 70, fontWeight: 500 }}>Gender</div>
              <Select
                style={{ width: 180 }}
                value={gender}
                placeholder={"Gender"}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"all"}>
                  {"All"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"female"}>
                  {"Female"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"male"}>
                  {"Male"}
                </MenuItem>
              </Select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <div style={{ width: 70, fontWeight: 500 }}>Type</div>
              <Select
                style={{ width: 180 }}
                value={type}
                placeholder={"Type"}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"all"}>
                  {"All"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"shirts"}>
                  {"Shirts / Tops"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"shoes"}>
                  {"Shoes"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"shorts"}>
                  {"Shorts"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"dress"}>
                  {"Dress"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"jeans"}>
                  {"Jeans"}
                </MenuItem>
                <MenuItem
                  style={{ marginTop: 5, height: 50 }}
                  value={"sweaters"}
                >
                  {"Sweaters"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"coats"}>
                  {"Coats & Jackets"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"pants"}>
                  {"Pants"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"skirts"}>
                  {"Skirts"}
                </MenuItem>
                <MenuItem
                  style={{ marginTop: 5, height: 50 }}
                  value={"swimwear"}
                >
                  {"Swimwear"}
                </MenuItem>
              </Select>
            </div>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <div style={{ width: 70, fontWeight: 500 }}>Size</div>
              <Select
                style={{ width: 180 }}
                value={size}
                placeholder={"Size"}
                onChange={(e) => setSize(e.target.value)}
              >
                <MenuItem style={{ marginTop: 5, height: 50 }} value={"all"}>
                  {"All"}
                </MenuItem>
                <MenuItem style={{ marginTop: 5, height: 50 }} value={""}>
                  {""}
                </MenuItem>
              </Select>
            </div> */}
          </div>
        )}
        {/* <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Electronics"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Home"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Garden"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Pet Supplies"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Sports & Hobbies"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"Toys & Games"}
          </div>
        </div> */}
      </div>

      <div
        id="clear"
        style={{
          backgroundColor: "#d1d1d1",
          padding: 10,
          width: 100,
          alignSelf: "center",
          textAlign: "center",
          borderRadius: 5,
          fontWeight: 600,
          marginTop: 50,
          marginBottom: 50,
        }}
        onClick={() =>
          clearContent(props, handleClose, clear, setType, setGender)
        }
      >
        CLEAR
      </div>

      <div
        id="save"
        style={{
          backgroundColor: "#d1d1d1",
          padding: 10,
          width: 100,
          alignSelf: "center",
          textAlign: "center",
          borderRadius: 5,
          marginTop: 50,
          fontWeight: 600,
          marginBottom: 50,
        }}
        onClick={() => saveContent(props, [type, gender], handleClose)}
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

function clearContent(props, handleClose, clear, setType, setGender) {
  setType("all");
  setGender("all");

  clear();
  props.clearContent();
  handleClose();
}

function saveContent(props, clothing, handleClose) {
  props.changeContent(clothing);
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
    <div>
      <div
        onClick={handleClickOpen}
        id="price"
        style={{
          borderWidth: 1,
          borderRadius: 20,
          borderStyle: "solid",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 25,
          paddingRight: 25,
          borderColor: "#a1a1a1",
          marginTop: 10,
          fontSize: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        More
      </div>
      <SimpleDialog
        clearContent={props.clearContent}
        changeContent={props.changeContent}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
