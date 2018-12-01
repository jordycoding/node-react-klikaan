import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "../roomComponent/roomComponent";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import SettingsDialog from "../../Dialogs/settingsDialog";
import "./roomsComponent.css";
class RoomsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.toggleSettingsDialog = this.toggleSettingsDialog.bind(this);
    this.closeSettingsDialog = this.closeSettingsDialog.bind(this);
  }
  componentDidMount() {
    fetch("/getAllRooms")
      .then(res => res.json())
      .then(resJson =>
        this.setState({
          rooms: resJson,
          dialogOpen: false
        })
      );
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
        <div className="rooms">
          {this.state.rooms.map(room => {
            if (room.status === "A") {
              return (
                <Card>
                  <CardContent>
                    <RoomComponent room={room} />
                  </CardContent>
                </Card>
              );
            }
          })}
        </div>
        <SettingsDialog
          open={this.state.dialogOpen}
          close={this.closeSettingsDialog}
          checkSettingsFile={this.props.checkSettingsFile}
        />
      </>
    );
  }
}

export default RoomsComponent;
