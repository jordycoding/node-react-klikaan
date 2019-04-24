import React, { useState } from "react";
import {
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Fab
} from "@material-ui/core";
import { Close, Add, Delete, Timer } from "@material-ui/icons";
import "./addSequenceDialog/addSequenceDialog.css";
import { connect } from "react-redux";
import commandToString from "../../utils/SequencesUtils";
import AddCommandDialog from "../../components/AddCommandDialog";
import ChangeWaitTimeDialog from "../../components/ChangeWaitTimeDialog";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function AddSequenceDialog(props) {
  const [commands, setCommands] = useState([]);
  const [addCommandDialogOpen, setAddCommandDialogOpen] = useState(false);
  const [changeDelayDialogOpen, setChangeDelayDialogOpen] = useState(false);
  const addCommand = command => {
    setCommands([...commands, command]);
    setAddCommandDialogOpen(false);
  };
  const removeCommand = commandIndex => {
    let newCommands = commands.filter(
      (command, index) => index != commandIndex
    );
    setCommands(newCommands);
  };
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={() => {
        props.handleClose();
      }}
      TransitionComponent={Transition}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={props.handleClose}>
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            classes={{ root: "titleText" }}
          >
            Nieuwe scene
          </Typography>
          <Button color="inherit">Opslaan</Button>
        </Toolbar>
      </AppBar>
      {props.open ? (
        <List>
          {commands.map((command, index) => {
            return (
              <ListItem key={index}>
                <ListItemText
                  primary={commandToString(command.split(",")[0], props.rooms)}
                  secondary={`Wait ${command.split(",")[1]}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeCommand(index)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <AddCommandDialog
        open={addCommandDialogOpen}
        handleClose={() => setAddCommandDialogOpen(false)}
        addCommandFunction={addCommand}
      />
      <Fab
        color="primary"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px"
        }}
        onClick={() => setAddCommandDialogOpen(true)}
      >
        <Add />
      </Fab>
      {/*<ChangeWaitTimeDialog*/}
      {/*  open={changeDelayDialogOpen}*/}
      {/*  handleClose={() => setChangeDelayDialogOpen(false)}*/}
      {/*/>*/}
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.rooms
  };
};

export default connect(mapStateToProps)(AddSequenceDialog);
