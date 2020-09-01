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
  const { onClose, selectedValue, open, sales } = props;

  const [checked, setChecked] = React.useState(sales);

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
    setChecked([true, true, true, true, true, true, true, true, true]);
  };

  return (
    <Dialog
      fullScreen={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        style={{ height: "100vh", overflowY: "scroll", overflowX: "hidden" }}
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
              width: "4vh",
              height: "4vh",
              top: "3vh",
              right: "3vh",
              position: "fixed",
            }}
          />
        </div>
        <div
          style={{
            alignSelf: "center",
            textAlign: "center",
            marginTop: 30,
            marginLeft: 20,
            marginRight: 20,
            fontSize: 18,
          }}
        >
          <b>% Off our original posted price</b> <br />
          Items drop 10% in price every week
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
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"0%"}
            </div>
            <div id="check">
              <Checkbox
                checked={checked[0]}
                onChange={() => handleChange(0)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"10%"}
            </div>
            <div id="check">
              <Checkbox
                checked={checked[1]}
                onChange={() => handleChange(1)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"20%"}
            </div>
            <div id="check">
              <Checkbox
                checked={checked[2]}
                onChange={() => handleChange(2)}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"30%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
                checked={checked[3]}
                onChange={() => handleChange(3)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"40%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
                checked={checked[4]}
                onChange={() => handleChange(4)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"50%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
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
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"60%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
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
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"70%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
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
                width: 100,
                fontSize: 24,
                fontWeight: 500,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {"80%"}
            </div>
            <div id="check">
              <Checkbox
                disabled
                checked={checked[8]}
                onChange={() => handleChange(8)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2vh",
          }}
        >
          <div
            id="clear"
            style={{
              backgroundColor: "#dae2f1",
              padding: 10,
              width: "25vw",
              height: "5vh",
              alignSelf: "center",
              textAlign: "center",
              fontSize: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              fontWeight: 600,
            }}
            onClick={() => clearContent(props, handleClose, clear)}
          >
            CLEAR
          </div>
          <div style={{ width: "10vw" }}></div>

          <div
            id="save"
            style={{
              backgroundColor: "rgb(66, 108, 180)",
              opacity:
                checked[0] == false &&
                checked[1] == false &&
                checked[2] == false
                  ? 0.2
                  : 1,
              padding: 10,
              width: 100,
              alignSelf: "center",
              width: "25vw",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              fontSize: 24,
              textAlign: "center",
              alignItems: "center",
              borderRadius: 5,
              color: "white",
              fontWeight: 600,
            }}
            onClick={() => saveContent(props, checked, handleClose)}
          >
            SAVE
          </div>
        </div>
        <div style={{ height: "20vh" }}></div>
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
  if (saved[0] == false && saved[1] == false && saved[2] == false) {
    return;
  }
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  props.changeSales(saved);
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
    <div
      style={{
        padding: 10,
        // backgroundColor: activeSaleFilter ? "rgb(218, 226, 241)" : "white",
        width: "80%",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
        borderWidth: 1,
        borderColor: "rgb(55, 89, 149)",
        height: "20%",
        borderStyle: "solid",
      }}
    >
      <div
        onClick={handleClickOpen}
        id="price"
        style={{
          fontFamily: "Gill Sans",
          color: "rgb(55, 89, 149)",
          fontWeight: "500",
          fontSize: 26,
          fontFamily: "Gill Sans",
        }}
      >
        Sale
      </div>
      <SimpleDialog
        sales={props.sales}
        clearContent={props.clearContent}
        changeSales={props.changeSales}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
