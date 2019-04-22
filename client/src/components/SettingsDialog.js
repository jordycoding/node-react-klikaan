import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { removeSettings, saveSettingsToServer } from "../utils/api";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SettingsDialog extends Component {
  constructor(props) {
    super(props);
    this.deleteSettings = this.deleteSettings.bind(this);
  }
  deleteSettings() {
    removeSettings(() => this.props.checkSettingsFile());
  }
  render() {
    const { open } = this.props;
    return (
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color={"inherit"}
              classes={{
                root: "appText"
              }}
            >
              Settings
            </Typography>
            <IconButton onClick={this.props.close} color={"inherit"}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText
              primary="Remove settings"
              onClick={() => this.deleteSettings()}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Save settings to server"
              onClick={() => saveSettingsToServer()}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    );
  }
}

export default SettingsDialog;
