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
  ListItemText
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./editSequenceDialog/editSequenceDialog.css";
import { connect } from "react-redux";
import commandToString, { getRoomName } from "../../utils/SequencesUtils";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EditSequenceDialog extends Component {
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
            <Button color="inherit">Opslaan</Button>
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
export default connect(mapStateToProps)(EditSequenceDialog);
