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
  Fab
} from "@material-ui/core";
import { Close, Add } from "@material-ui/icons";
import "./editSequenceDialog/editSequenceDialog.css";
import { connect } from "react-redux";
import commandToString, { getRoomName } from "../../utils/SequencesUtils";
import AddCommandDialog from "./editSequenceDialog/AddCommandDialog";
import { sequencesOperations } from "../../modules/sequences";
import { withSnackbar } from "notistack";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditSequenceDialog extends Component {
  state = {
    addCommandDialogOpen: false
  };

  toggleDialog = () => {
    this.setState({
      addCommandDialogOpen: !this.state.addCommandDialogOpen
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
              Bewerk scene
            </Typography>
            <Button color="inherit" onClick={this.saveSequence}>
              Opslaan
            </Button>
          </Toolbar>
        </AppBar>
        {this.props.open ? (
          <List>
            {this.props.sequenceCommands.map(command => {
              return (
                <ListItem key={command}>
                  <ListItemText
                    primary={getRoomName(
                      command.split(",")[0],
                      this.props.rooms
                    )}
                    secondary={commandToString(
                      command.split(",")[0],
                      this.props.rooms
                    )}
                  />
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
