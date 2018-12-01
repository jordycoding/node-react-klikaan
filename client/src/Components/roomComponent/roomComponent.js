import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DeviceComponent from "../deviceComponent/deviceComponent";
import Button from "@material-ui/core/Button";
import { allOff } from "../../api";
import "./roomComponent.css";
class RoomComponent extends Component {
  constructor(props) {
    super(props);
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
            onClick={() => allOff(this.props.room.id)}
          >
            Alles uit
          </Button>
        </div>
        {this.props.room.devices.map(device => {
          if (device.status === "D" || device.status === "O") {
            return (
              <DeviceComponent device={device} roomId={this.props.room.id} />
            );
          }
        })}
      </>
    );
  }
}

export default RoomComponent;
