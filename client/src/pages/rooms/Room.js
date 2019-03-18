import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DeviceComponent from "./room/Device";
import Button from "@material-ui/core/Button";
import { roomsOperations } from "../../modules/rooms/index.js";
import "./room/room.css";
import { connect } from "react-redux";
class RoomComponent extends Component {
  constructor(props) {
    super(props);
    this.turnAllOff = this.turnAllOff.bind(this);
  }
  turnAllOff() {
    this.props.dispatch(roomsOperations.setRoomAllOff(this.props.room.id));
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
