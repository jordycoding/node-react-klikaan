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
    margin: "7px 5px 7px 5px"
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
              size="small"
              onClick={this.turnOn}
            >
              Aan
            </MarginButton>
            <MarginButton
              variant="contained"
              color="secondary"
              size="small"
              onClick={this.turnOff}
            >
              Uit
            </MarginButton>
          </MuiThemeProvider>
        </div>
      );
    } else if (this.props.device.status === "D") {
      return (
        <div className="dimmer">
          <Typography component="p">
            {this.props.device.name.charAt(0).toUpperCase() +
              this.props.device.name.slice(1)}
          </Typography>
          <MarginSlider value={this.state.value} onChange={this.handleSlider} />
        </div>
      );
    }
  }
}

export default DeviceComponent;
