import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmDeleteDialog extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete sequence {this.props.sequenceName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove the sequence{" "}
            {this.props.sequenceName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            No
          </Button>
          <Button onClick={this.props.confirmDelete} color="primary" autofocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDeleteDialog;
