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
import FeedbackForm from "feedback-fish";

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
        Feedback
      </div>

      {/* <FeedbackForm projectId="e97ba4961056ae" /> */}
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
        Feedback
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
