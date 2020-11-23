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
        }}
      >
        Category
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
          justifyContent: "center",
          // alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <div
          onClick={() => saveContent(props, -1, handleClose)}
          className="category-link"
        >
          {"All"}
        </div>

        <div
          onClick={() => saveContent(props, 0, handleClose)}
          className="category-link"
        >
          {"Art & Decoration"}
        </div>
        <div
          onClick={() => saveContent(props, 1, handleClose)}
          className="category-link"
        >
          {"Books"}
        </div>
        <div
          onClick={() => saveContent(props, 2, handleClose)}
          className="category-link"
        >
          {"Clothing, Shoes, & Accessories"}
        </div>
        <div
          onClick={() => saveContent(props, 3, handleClose)}
          className="category-link"
        >
          {"Electronics"}
        </div>
        <div
          onClick={() => saveContent(props, 4, handleClose)}
          className="category-link"
        >
          {"Home"}
        </div>
        <div
          onClick={() => saveContent(props, 5, handleClose)}
          className="category-link"
        >
          {"Garden"}
        </div>
        <div
          onClick={() => saveContent(props, 6, handleClose)}
          className="category-link"
        >
          {"Pet Supplies"}
        </div>
        <div
          onClick={() => saveContent(props, 7, handleClose)}
          className="category-link"
        >
          {"Sports & Hobbies"}
        </div>
        <div
          onClick={() => saveContent(props, 8, handleClose)}
          className="category-link"
        >
          {"Toys & Games"}
        </div>
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

function saveContent(props, category, handleClose) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  props.changeCategory(category);
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
        Categories
      </div>
      <SimpleDialog
        clearContent={props.clearContent}
        changeCategory={props.changeCategory}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
