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
import "../css/CategoryDialogMobile.css";

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

  const handleClose = () => {
    onClose(selectedValue);
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
              width: 30,
              height: 30,
              top: 20,
              right: 20,
              position: "fixed",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 32,
            marginLeft: "5%",
            fontWeight: "500",
            fontFamily: "Gill Sans",
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          Pages
        </div>
        <div
          onClick={() => saveContent(props, "", handleClose)}
          className="category-mobile-link"
        >
          See everything
        </div>
        <div
          onClick={() =>
            saveContent(props, "Just dropped in price", handleClose)
          }
          className="category-mobile-link"
        >
          Just dropped in price
        </div>
        <div
          onClick={() => saveContent(props, "Just added", handleClose)}
          className="category-mobile-link"
        >
          Just added
        </div>
        <div
          onClick={() =>
            saveContent(props, "Cheapest of the cheap", handleClose)
          }
          className="category-mobile-link"
        >
          Cheapest of the cheap
        </div>

        <div style={{ height: 50 }}></div>

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
        Page
      </div>
      <SimpleDialog
        changePage={props.changePage}
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
