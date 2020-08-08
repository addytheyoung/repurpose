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
            marginTop: 0,
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          Categories
        </div>
        <div style={{ height: "4vh" }}></div>
        <div
          onClick={() => saveContent(props, -1, handleClose)}
          className="category-mobile-link"
        >
          {"All"}
        </div>

        <div
          onClick={() => saveContent(props, 0, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[0] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Art & Decoration"}
        </div>

        <div
          onClick={() => saveContent(props, 1, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[1] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Books"}
        </div>

        <div
          onClick={() => saveContent(props, 2, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[2] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Clothing, Shoes, & Accessories"}
        </div>

        <div
          onClick={() => saveContent(props, 3, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[3] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Electronics"}
        </div>

        <div
          onClick={() => saveContent(props, 4, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[4] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Home"}
        </div>

        <div
          onClick={() => saveContent(props, 5, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[5] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Garden"}
        </div>

        <div
          onClick={() => saveContent(props, 6, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[5] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Pet Supplies"}
        </div>

        <div
          onClick={() => saveContent(props, 7, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[6] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Sports & Hobbies"}
        </div>

        <div
          onClick={() => saveContent(props, 8, handleClose)}
          className="category-mobile-link"
          style={{
            backgroundColor:
              categories[7] && categories.includes(false)
                ? "rgb(218, 226, 241)"
                : "#ffffff",
          }}
        >
          {"Toys & Games"}
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
          fontSize: 24,
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
