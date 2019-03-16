import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DeviceComponent from "./room/Device";
import Button from "@material-ui/core/Button";
import { allOff } from "../../utils/api";
import { roomsActions } from "../../modules/rooms/index.js";
import "./room/room.css";
import { connect } from "react-redux";
class RoomComponent extends Component {
  constructor(props) {
    super(props);
    this.setAllOff = this.turnAllOff.bind(this);
  }
  turnAllOff() {
    this.props.dispatch(roomsActions.setAllOff(this.props.room.id, true));
    allOff(this.props.room.id)
      .then(res => res.text())
      .then(text => {
        if (text === "ok") {
          this.props.dispatch(
            roomsActions.setAllOff(this.props.room.id, false)
          );
        }
      });
  }
  render() {
    return (
      <>
        <div className="roomHeader">
          <Typography color="textSecondary">{this.props.room.name}</Typography>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={() => this.turnAllOff()}
          >
            Alles uit
          </Button>
        </div>
        {this.props.room.devices.map(device => {
          if (device.status === "D" || device.status === "O") {
            return (
              <DeviceComponent
                device={device}
                roomId={this.props.room.id}
                allOffToggled={this.props.room.allOffToggled}
                key={`${this.props.room.id}${device.id}`}
              />
            );
          }
        })}
      </>
    );
  }
}

export default connect()(RoomComponent);
