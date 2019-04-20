import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";
import { withStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import "./device/device.css";
import { turnOn, turnOff, dim } from "../../../utils/api";
import { debounce } from "lodash";
import styled, { css } from "styled-components";

const MarginSlider = withStyles({
  root: {
    margin: "10px 5px 10px 5px"
  }
})(Slider);

const StyledButton = styled(Button)`
  && {
    margin: 5px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    ${props =>
      props.on &&
      css`
        background: #4caf50;
        color: black;
        &: hover {
          background: #388e3c;
          color: white;
        }
      `}

    ${props =>
      props.off &&
      css`
        background: #f44336;
        color: white;
        &:hover {
          background: #d32f2f;
        }
      `}
  }
`;
class DeviceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.allOffToggled === true) {
      return {
        value: 0
      };
    } else {
      return null;
    }
  }
  handleSlider(event, value) {
    this.setState({ value: value }, () => this.dimDevice());
  }
  turnOn() {
    turnOn(this.props.device.id, this.props.roomId);
  }
  turnOff() {
    turnOff(this.props.device.id, this.props.roomId);
  }
  dimDevice = debounce(() => {
    dim(this.props.device.id, this.props.roomId, this.state.value);
  }, 500);
  render() {
    if (this.props.device.status === "O") {
      return (
        <div className="toggle">
          <Typography component="p" className="text">
            {this.props.device.name.charAt(0).toUpperCase() +
              this.props.device.name.slice(1)}
          </Typography>
          <StyledButton onClick={this.turnOn} on>
            Aan
          </StyledButton>
          <StyledButton onClick={this.turnOff} off>
            Uit
          </StyledButton>
        </div>
      );
    } else if (this.props.device.status === "D") {
      return (
        <div className="dimmerRoot">
          <div className="dimmer">
            <Typography component="p">
              {this.props.device.name.charAt(0).toUpperCase() +
                this.props.device.name.slice(1)}
            </Typography>
            <MarginSlider
              value={this.state.value}
              onChange={this.handleSlider}
            />
          </div>
          <div className="dimmerButtons">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                dim(this.props.device.id, this.props.roomId, 0);
                this.setState({ value: 0 });
              }}
            >
              0%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                dim(this.props.device.id, this.props.roomId, 25);
                this.setState({ value: 25 });
              }}
            >
              25%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                dim(this.props.device.id, this.props.roomId, 50);
                this.setState({ value: 50 });
              }}
            >
              50%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                dim(this.props.device.id, this.props.roomId, 100);
                this.setState({ value: 100 });
              }}
            >
              100%
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default DeviceComponent;
