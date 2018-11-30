import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DeviceComponent from "../deviceComponent/deviceComponent";
class RoomComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="room">
        <Typography color="textSecondary">{this.props.room.name}</Typography>
        {this.props.room.devices.map(device => {
          if (device.status === "D" || device.status === "O") {
            return (
              <DeviceComponent device={device} roomId={this.props.room.id} />
            );
          }
        })}
      </div>
    );
  }
}

export default RoomComponent;