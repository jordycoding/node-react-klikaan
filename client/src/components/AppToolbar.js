import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import SettingsDialog from "./SettingsDialog";
class AppToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    };
    this.toggleSettingsDialog = this.toggleSettingsDialog.bind(this);
    this.closeSettingsDialog = this.closeSettingsDialog.bind(this);
  }
  toggleSettingsDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  }
  closeSettingsDialog() {
    this.setState({
      dialogOpen: false
    });
  }
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              classes={{
                root: "appText"
              }}
            >
              Ruimtes
            </Typography>
            <IconButton color={"inherit"} onClick={this.toggleSettingsDialog}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SettingsDialog
          open={this.state.dialogOpen}
          close={this.closeSettingsDialog}
          checkSettingsFile={this.props.checkSettingsFile}
        />
      </>
    );
  }
}

export default AppToolbar;