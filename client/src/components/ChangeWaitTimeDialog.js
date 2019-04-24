import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";
import { connect } from "react-redux";
import { editsequenceActions } from "../modules/editSequence";
import { withSnackbar } from "notistack";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class ChangeWaitTimeDialog extends Component {
  state = {
    delay: ""
  };
  handleDelayChange = event => {
    this.setState({ delay: event.target.value });
  };
  handleChange = async event => {
    if (this.state.delay !== "") {
      await this.props.changeDelayFunction(this.state.delay, this.props.index)
      this.props.enqueueSnackbar("Delay changed", { variant: "success" });
      this.props.handleClose();
    } else {
      this.props.enqueueSnackbar("There was an error", { variant: "error" });
    }
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Change delay</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input the new delay in the format: HH:MM:SS
          </DialogContentText>
          <TextField
            autoFocus
            placeholder="Delay"
            onChange={this.handleDelayChange}
            error={
              !/([0-9][0-9]):(60|0[0-9]|[0-5][0-9]):(60|0[0-9]|[0-5][0-9]$)/.test(
                this.state.delay
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleChange} color="primary">
            Confirm change
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withSnackbar(connect()(ChangeWaitTimeDialog));
