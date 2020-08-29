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
  ]);

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
          display: "flex",
          flexDirection: "column",
          marginTop: 30,
          justifyContent: "center",
          // alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <div
          onClick={() => saveContent(props, "", handleClose)}
          className="category-link"
        >
          See everything
        </div>
        <div
          onClick={() =>
            saveContent(props, "Just dropped in price", handleClose)
          }
          className="category-link"
        >
          Just dropped in price
        </div>
        <div
          onClick={() => saveContent(props, "Just added", handleClose)}
          className="category-link"
        >
          Just added
        </div>
        <div
          onClick={() =>
            saveContent(props, "Cheapest of the cheap", handleClose)
          }
          className="category-link"
        >
          Cheapest of the cheap
        </div>
        <div
          onClick={() => saveContent(3)}
          className="category-link"
          style={{ fontWeight: 400 }}
        >
          More coming soon!
        </div>
        <div style={{ height: 50 }}></div>
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
  props.clearContent();
  handleClose();
}

function saveContent(props, page, handleClose) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  props.changePage(page);
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
        Page
      </div>
      <SimpleDialog
        clearContent={props.clearContent}
        changePage={props.changePage}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
