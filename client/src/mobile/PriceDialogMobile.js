import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
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
  const { onClose, selectedValue, open, minPrice, maxPrice } = props;
  const [min, setMin] = React.useState("$" + minPrice);
  const [max, setMax] = React.useState("$" + maxPrice);
  console.log(max);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const clear = () => {
    setMax("$");
    setMin("$");
  };

  return (
    <Dialog
      fullScreen={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div
        style={{ overflowY: "scroll", overflowX: "hidden", height: "100vh" }}
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
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Price
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 30,
            fontSize: 26,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            value={min}
            placeholder="Min price $"
            type="text"
            onChange={(e) => checkKey(e)}
            style={{
              width: "20vw",
              fontSize: 26,
              marginRight: "2vw",
              height: "5vh",
            }}
          />
          {"-"}
          <Input
            value={max}
            placeholder="Max price $"
            type="text"
            onChange={(e) => checkKey(e, true)}
            style={{
              width: "20vw",
              marginLeft: "2vw",
              fontSize: 26,
              height: "5vh",
            }}
          />
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
            fontSize: 26,
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
            fontSize: 26,
            textAlign: "center",
            alignItems: "center",
            borderRadius: 5,
            marginTop: 50,
            fontWeight: 600,
            marginBottom: 50,
          }}
          onClick={() => saveContent(props, min, max, handleClose)}
        >
          SAVE
        </div>
        <div style={{ height: "20vh" }}></div>
      </div>
    </Dialog>
  );

  function checkKey(event, max) {
    const val = event.target.value[event.target.value.toString().length - 1];
    for (var i = 1; i < event.target.value.toString().length; i++) {
      if (event.target.value.toString().charAt(i) == "$") {
        return;
      }
    }
    if (
      event.target.value[0] == "$" &&
      (val == "$" ||
        val == 0 ||
        val == 1 ||
        val == 2 ||
        val == 3 ||
        val == 4 ||
        val == 5 ||
        val == 6 ||
        val == 7 ||
        val == 8 ||
        val == 9)
    ) {
      if (max) {
        setMax(event.target.value);
      } else {
        setMin(event.target.value);
      }
    }
  }
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function clearContent(props, handleClose, clear) {
  clear();
  props.clearContent();
  handleClose();
}

function saveContent(props, min, max, handleClose) {
  if (max >= min) {
    props.changePrice(min, max);
    handleClose();
  } else {
    alert("Bad price");
  }
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
    <div style={{ marginTop: "10vh" }}>
      <div
        onClick={handleClickOpen}
        id="price"
        style={{
          borderWidth: 3,
          borderRadius: 20,
          borderStyle: "solid",
          zIndex: 500,
          paddingTop: 10,
          paddingBottom: 10,
          minWidth: "50vw",
          minHeight: "5vh",
          paddingLeft: 25,
          fontWeight: 600,
          paddingRight: 25,
          borderColor: "#a1a1a1",
          fontSize: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Price
      </div>
      <SimpleDialog
        minPrice={props.minPrice}
        maxPrice={props.maxPrice}
        clearContent={props.clearContent}
        changePrice={props.changePrice}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
