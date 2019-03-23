import React from "react";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Slide
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./editSequenceDialog/editSequenceDialog.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
function EditSequenceDialog(props) {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={props.handleClose}>
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            classes={{ root: "titleText" }}
          >
            Bewerk scene
          </Typography>
          <Button color="inherit">Opslaan</Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}
export default EditSequenceDialog;
