import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/lab/Slider";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import "./deviceComponent.css";
import { turnOn, turnOff, dim } from "../../api";
import { debounce } from "lodash";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});

const MarginSlider = withStyles({
  root: {
    margin: "10px 5px 10px 5px"
  }
})(Slider);

const MarginButton = withStyles({
  root: {
    margin: "5px"
  }
})(Button);
class DeviceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
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
          <MuiThemeProvider theme={theme}>
            <Typography component="p" className="text">
              {this.props.device.name.charAt(0).toUpperCase() +
                this.props.device.name.slice(1)}
            </Typography>
            <MarginButton
              variant="contained"
              color="primary"
              onClick={this.turnOn}
              size="small"
            >
              Aan
            </MarginButton>
            <MarginButton
              variant="contained"
              color="secondary"
              onClick={this.turnOff}
              size="small"
            >
              Uit
            </MarginButton>
          </MuiThemeProvider>
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
              onClick={() => dim(this.props.device.id, this.props.roomId, 0)}
            >
              0%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => dim(this.props.device.id, this.props.roomId, 25)}
            >
              25%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => dim(this.props.device.id, this.props.roomId, 50)}
            >
              50%
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => dim(this.props.device.id, this.props.roomId, 100)}
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
