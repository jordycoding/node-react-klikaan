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
  Fab,
  TextField
} from "@material-ui/core";
import { Close, Add, Delete, Timer } from "@material-ui/icons";
import "./addSequenceDialog/addSequenceDialog.css";
import { connect } from "react-redux";
import commandToString from "../../utils/SequencesUtils";
import AddCommandDialog from "../../components/AddCommandDialog";
import ChangeWaitTimeDialog from "../../components/ChangeWaitTimeDialog";
import { addSequence } from "../../utils/api";
import { withSnackbar } from "notistack";
import { sequencesOperations } from "../../modules/sequences";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function AddSequenceDialog(props) {
  const [commands, setCommands] = useState([]);
  const [addCommandDialogOpen, setAddCommandDialogOpen] = useState(false);
  const [changeDelayDialogOpen, setChangeDelayDialogOpen] = useState(false);
  const [changeDelayIndex, setChangeDelayIndex] = useState("");
  const [name, setName] = useState("");
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
  const changeWaitTime = async (delay, commandIndex) => {
    let newCommands = commands.map((command, index) => {
      if (index == commandIndex) {
        return `${command.split(",")[0]},${delay}`;
      } else {
        return command;
      }
    });
    setCommands(newCommands);
  };
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const saveSequence = () => {
    if (name !== "" && commands.length !== 0) {
      console.log("Saving ");
      addSequence(name, commands)
        .then(res => {
          if (res.status === 200) {
            props.enqueueSnackbar("Sequence saved", { variant: "success" });
          } else {
            props.enqueueSnackbar("There was an error saving the sequence", {
              variant: "error"
            });
          }
          props.dispatch(sequencesOperations.getSequences());
          props.handleClose();
        })
        .catch(
          err => props.enqueueSnackbar("There was an error on the server"),
          { variant: "error" }
        );
    } else if (name === "" && commands.length !== 0) {
      props.enqueueSnackbar("Please insert a name", { variant: "error" });
    } else if (name !== "" && commands.length === 0) {
      props.enqueueSnackbar("Please add at least one command", {
        variant: "error"
      });
    } else {
      props.enqueueSnackbar("Please add a name and commands", {
        variant: "error"
      });
    }
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
          <Button color="inherit" onClick={saveSequence}>
            Opslaan
          </Button>
        </Toolbar>
      </AppBar>
      <TextField
        placeholder="Name"
        onChange={handleNameChange}
        style={{
          margin: "5px"
        }}
      />
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
                  <IconButton
                    onClick={() => {
                      setChangeDelayIndex(index);
                      setChangeDelayDialogOpen(true);
                    }}
                  >
                    <Timer />
                  </IconButton>
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
      <ChangeWaitTimeDialog
        open={changeDelayDialogOpen}
        handleClose={() => setChangeDelayDialogOpen(false)}
        index={changeDelayIndex}
        changeDelayFunction={changeWaitTime}
      />
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.rooms
  };
};

export default withSnackbar(connect(mapStateToProps)(AddSequenceDialog));
