import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  Slide,
  FormControl,
  FormGroup,
  FormControlLabel,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  TextField
} from "@material-ui/core";
import Slider from "@material-ui/lab/Slider/index";
import { connect } from "react-redux";
import "./addCommandDialog.css";
import { editsequenceActions } from "../modules/editSequence";
import { withSnackbar } from "notistack";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddCommandDialog extends React.Component {
  state = {
    roomId: "",
    deviceId: "",
    deviceType: "",
    command: "",
    alloffChecked: false,
    onoff: "",
    dimValue: 0,
    waitTime: ""
  };
  devices;
  handleRoomSelect = event => {
    event.preventDefault();
    this.setState({
      roomId: event.target.value,
      deviceId: "",
      deviceType: "",
      command: "",
      alloffChecked: false,
      onoff: "",
      dimValue: 0
    });
    this.devices = this.props.rooms.map(room => {
      let variable;
      if (room.id === event.target.value) {
        variable = room.devices.map(device => {
          if (device.status === "O" || device.status === "D") {
            return (
              <MenuItem value={device.id} devicetype={device.status}>
                {device.name}
              </MenuItem>
            );
          }
        });
      }
      return variable;
    });
  };
  handleDeviceSelect = event => {
    this.setState({
      ...this.state,
      deviceId: event.target.value,
      deviceType: event.nativeEvent.target.getAttribute("devicetype")
    });
  };
  alloffChecked = event => {
    this.setState({
      ...this.state,
      alloffChecked: event.target.checked
    });
  };
  radioChecked = event => {
    this.setState({
      onoff: event.target.value
    });
  };
  handleDimSlider = (event, value) => {
    this.setState({ ...this.state, dimValue: value });
  };
  handleWaitChange = event => {
    this.setState({ waitTime: event.target.value });
  };
  addCommand = async () => {
    let waitTime =
      this.state.waitTime === "" ? "00:00:00" : this.state.waitTime;
    if (
      this.state.alloffChecked === false &&
      this.state.roomId !== "" &&
      this.state.deviceId !== ""
    ) {
      if (this.state.deviceType === "D") {
        this.props.addCommandFunction(
          `!R${this.state.roomId}D${this.state.deviceId}FdP${Math.round(
            this.state.dimValue * 0.01 * 32
          )},${waitTime}`
        );
      }
      if (this.state.deviceType === "O") {
        if (this.state.onoff !== "") {
          this.props.addCommandFunction(
            `!R${this.state.roomId}D${this.state.deviceId}F${
              this.state.onoff === "off" ? 0 : 1
            },${waitTime}`
          );
        }
      }
    } else if (this.state.alloffChecked === true) {
      this.props.addCommandFunction(`!R${this.state.roomId}Fa,${waitTime}`);
    } else {
      this.props.enqueueSnackbar("Please insert a valid command", {
        variant: "error"
      });
    }
  };
  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        disableBackdropClick
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>{"Add Command"}</DialogTitle>
        <DialogContent
          style={{
            overflowX: "hidden"
          }}
        >
          <form>
            <FormControl className="formcontrol">
              <InputLabel htmlFor="room">Room</InputLabel>
              <Select
                value={this.state.roomId}
                inputProps={{ name: "room", id: "room" }}
                onChange={this.handleRoomSelect}
                autoWidth
              >
                {this.props.rooms.map(room => {
                  if (room.status === "A") {
                    return <MenuItem value={room.id}>{room.name}</MenuItem>;
                  }
                })}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.alloffChecked}
                  onChange={this.alloffChecked}
                  value="alloffChecked"
                />
              }
              label="All off"
            />
            <FormControl className="formcontrol">
              <InputLabel htmlFor="device">Device</InputLabel>
              <Select
                value={this.state.deviceId}
                inputProps={{ name: "device", id: "device" }}
                onChange={this.handleDeviceSelect}
                autoWidth
                disabled={
                  this.state.alloffChecked | (this.devices === undefined)
                    ? true
                    : false
                }
              >
                {this.devices}
              </Select>
            </FormControl>
            <RadioGroup
              name="onoff"
              value={this.state.onoff}
              onChange={this.radioChecked}
              style={{
                display:
                  this.state.deviceType === "D" ||
                  this.state.deviceType === "" ||
                  this.state.alloffChecked === true
                    ? "none"
                    : "block"
              }}
            >
              <FormControlLabel value="on" control={<Radio />} label="on" />
              <FormControlLabel value="off" control={<Radio />} label="off" />
            </RadioGroup>
            <Typography
              color="textPrimary"
              style={{
                "margin-top": "10px",
                display:
                  this.state.deviceType === "O" ||
                  this.state.deviceType === "" ||
                  this.state.alloffChecked === true
                    ? "none"
                    : "block"
              }}
            >
              {this.state.dimValue}
            </Typography>
            <Slider
              value={this.state.dimValue}
              onChange={this.handleDimSlider}
              style={{
                "margin-top": "10px",
                display:
                  this.state.deviceType === "O" ||
                  this.state.deviceType === "" ||
                  this.state.alloffChecked === true
                    ? "none"
                    : "block"
              }}
              step={1}
            />
            <TextField
              onChange={this.handleWaitChange}
              placeholder="Waiting time in HH:MM:SS"
              fullWidth
              style={{ "margin-top": "10px" }}
              error={
                !/([0-9][0-9]):(60|0[0-9]|[0-5][0-9]):(60|0[0-9]|[0-5][0-9]$)/.test(
                  this.state.waitTime
                )
              }
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={this.addCommand}>
            Add
          </Button>
          <Button color="primary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms,
    sequenceTitle: state.editedSequence.sequenceTitle,
    sequenceCommands: state.editedSequence.sequenceCommands
  };
}
export default withSnackbar(
  connect(mapStateToProps)(withMobileDialog()(AddCommandDialog))
);
