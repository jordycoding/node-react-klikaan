import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DeviceComponent from "./room/Device";
import Button from "@material-ui/core/Button";
import { roomsOperations } from "../../modules/rooms/index.js";
import "./room/room.css";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

const StyledButton = styled(Button)`
  && {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    background: #f44336;
    color: white;
    height: 30px;
    padding: 0 5px;
    &:hover {
      background: #d32f2f;
    }
  }
`;
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
          <StyledButton onClick={() => this.turnAllOff()}>
            Alles uit
          </StyledButton>
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
