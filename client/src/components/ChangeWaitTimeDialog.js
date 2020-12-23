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
import {withTranslation} from "react-i18next";

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
        <DialogTitle>{this.props.t("change delay")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.t("input delay")}
          </DialogContentText>
          <TextField
            autoFocus
            placeholder={this.props.t("delay")}
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
            {this.props.t("cancel")}
          </Button>
          <Button onClick={this.handleChange} color="primary">
            {this.props.t("confirm change")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withTranslation()(withSnackbar(connect()(ChangeWaitTimeDialog)));
