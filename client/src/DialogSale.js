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
import "./css/Dialog.css";

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
  ]);

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

  const clear = () => {
    setChecked([true, true, true, true, true, true, true, true, true]);
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
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <b>Percentage off original posted price.</b> <br />
        Items drop 10% in price every week.
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
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            (New)
          </div>
          <div
            style={{
              display: "flex",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"0%"}
          </div>

          <Checkbox
            checked={checked[0]}
            onChange={() => handleChange(0)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"10%"}
          </div>
          <Checkbox
            checked={checked[1]}
            onChange={() => handleChange(1)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {"20%"}
          </div>
          <Checkbox
            checked={checked[2]}
            onChange={() => handleChange(2)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"30%"}
          </div>
          <Checkbox
            disabled
            checked={checked[3]}
            onChange={() => handleChange(3)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"40%"}
          </div>
          <Checkbox
            disabled
            checked={checked[4]}
            onChange={() => handleChange(4)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"50%"}
          </div>
          <Checkbox
            disabled
            checked={checked[5]}
            onChange={() => handleChange(5)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"60%"}
          </div>
          <Checkbox
            disabled
            checked={checked[6]}
            onChange={() => handleChange(6)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"70%"}
          </div>
          <Checkbox
            disabled
            checked={checked[7]}
            onChange={() => handleChange(7)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            (Final)
          </div>
          <div
            style={{
              display: "flex",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"80%"}
          </div>
          <Checkbox
            disabled
            checked={checked[8]}
            onChange={() => handleChange(8)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
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
        }}
        onClick={() => clearContent(props, handleClose, clear)}
      >
        CLEAR
      </div>

      <div
        id="save"
        style={{
          backgroundColor: "rgb(66, 108, 180)",
          color: "white",
          padding: 10,
          width: 100,
          alignSelf: "center",
          textAlign: "center",
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
  props.changeSale(saved);
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
          borderRadius: 5,
          borderStyle: "solid",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 5,
          paddingRight: 5,
          borderColor: "#a1a1a1",
          marginTop: 10,
          fontSize: 17,
          minWidth: "5vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Sale
      </div>
      <SimpleDialog
        clearContent={props.clearContent}
        changeSale={props.changeSale}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
