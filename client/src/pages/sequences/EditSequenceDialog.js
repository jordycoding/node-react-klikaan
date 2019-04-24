import React, { Component } from "react";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Fab
} from "@material-ui/core";
import { Close, Add, Delete, Timer } from "@material-ui/icons";
import "./editSequenceDialog/editSequenceDialog.css";
import { connect } from "react-redux";
import commandToString, { getRoomName } from "../../utils/SequencesUtils";
import AddCommandDialog from "../../components/AddCommandDialog";
import { sequencesOperations } from "../../modules/sequences";
import { editsequenceActions } from "../../modules/editSequence";
import { withSnackbar } from "notistack";
import ChangeWaitTimeDialog from "../../components/ChangeWaitTimeDialog";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditSequenceDialog extends Component {
  state = {
    addCommandDialogOpen: false,
    delayChangeIndex: "",
    delayDialogOpen: false
  };

  removeCommand = index => {
    this.props.dispatch(editsequenceActions.removeCommandFromSequence(index));
  };

  toggleDialog = () => {
    this.setState({
      addCommandDialogOpen: !this.state.addCommandDialogOpen
    });
  };

  handleDelayChange = index => {
    this.setState({
      delayChangeIndex: index,
      delayDialogOpen: true
    });
  };

  closeDelayDialog = () => {
    this.setState({
      delayChangeIndex: "",
      delayDialogOpen: false
    });
  };
  saveSequence = async () => {
    let body = {
      sequenceTitle: this.props.sequenceTitle,
      sequenceCommands: this.props.sequenceCommands
    };
    fetch("/api/editSequence", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.status === 200) {
          this.props.enqueueSnackbar("Sequence saved", { variant: "success" });
          this.props.handleClose();
        } else {
          this.props.enqueueSnackbar("There was an error", {
            variant: "error"
          });
        }
      })
      .catch(err =>
        this.props.enqueueSnackbar("There was a server error", {
          variant: "error"
        })
      );
    this.props.dispatch(sequencesOperations.getSequences());
  };

  addCommandToSequence = async command => {
    await this.props.dispatch(
      editsequenceActions.addCommandToSequence(command))
    this.toggleDialog()
  }

  changeDelay = async (delay, index) => {
    await this.props.dispatch(
        editsequenceActions.changeWaitTime(delay, index)
    );
  }
  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={this.props.handleClose}>
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              classes={{ root: "titleText" }}
            >
              Bewerk scene {this.props.sequenceTitle}
            </Typography>
            <Button color="inherit" onClick={this.saveSequence}>
              Opslaan
            </Button>
          </Toolbar>
        </AppBar>
        {this.props.open ? (
          <List>
            {this.props.sequenceCommands.map((command, index) => {
              return (
                <ListItem key={command}>
                  <ListItemText
                    primary={commandToString(
                      command.split(",")[0],
                      this.props.rooms
                    )}
                    secondary={`Wait ${command.split(",")[1]}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.handleDelayChange(index)}>
                      <Timer />
                    </IconButton>
                    <IconButton onClick={() => this.removeCommand(index)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : null}
        <Fab
          color="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px"
          }}
          onClick={() => {
            this.setState({ addCommandDialogOpen: true });
          }}
        >
          <Add />
        </Fab>
        <AddCommandDialog
          open={this.state.addCommandDialogOpen}
          handleClose={this.toggleDialog}
          addCommandFunction={this.addCommandToSequence}
        />
        <ChangeWaitTimeDialog
          open={this.state.delayDialogOpen}
          handleClose={this.closeDelayDialog}
          index={this.state.delayChangeIndex}
          changeDelayFunction={this.changeDelay}
        />
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
export default withSnackbar(connect(mapStateToProps)(EditSequenceDialog));
