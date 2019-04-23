import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sequencesOperations } from "../modules/sequences";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Fab
} from "@material-ui/core";
import { Edit, Delete, Add } from "@material-ui/icons";
import { startSequence } from "../utils/api";
import EditSequenceDialog from "./sequences/EditSequenceDialog";
import { stopAllSequences, removeSequence } from "../utils/api";
import "./sequences/sequences.css";
import { editsequenceActions } from "../modules/editSequence";
import { withSnackbar } from "notistack";

function SequencesComponent(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleDialogClose() {
    setDialogOpen(false);
  }
  async function editSequence(sequence) {
    await props.dispatch(
      editsequenceActions.setEditedSequenceTitle(sequence.title)
    );
    await props.dispatch(
      editsequenceActions.setEditedSequenceCommands(sequence.commands)
    );
    setDialogOpen(true);
  }
  useEffect(() => {
    props.dispatch(sequencesOperations.getSequences());
  }, []);

  function start(id) {
    startSequence(id);
  }
  if (props.isLoading || props.sequences.length === 0) {
    return (
      <div style={{ display: props.hidden ? "none" : "block" }}>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        style={{ display: props.hidden ? "none" : "block" }}
        className="sequencesContainer"
      >
        <div className="header">
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => stopAllSequences()}
          >
            Stop alle scenes
          </Button>
        </div>

        <List className="sequencesList">
          {props.sequences.map(sequence => {
            return (
              <ListItem button key={sequence.title}>
                <ListItemText
                  primary={sequence.title}
                  onClick={() => start(sequence.title)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      removeSequence(sequence.title)
                        .then(res => {
                          if (res.status === 200) {
                            props.enqueueSnackbar("Sequence removed", {
                              variant: "success"
                            });
                          } else {
                            props.enqueueSnackbar(
                              "There was an error removing the sequence",
                              { variant: "error" }
                            );
                          }
                        })
                        .catch(err =>
                          props.enqueueSnackbar("There was a server error", {
                            variant: "error"
                          })
                        );
                      props.dispatch(sequencesOperations.getSequences());
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => editSequence(sequence)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Fab
          color="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px"
          }}
        >
          <Add />
        </Fab>
        <EditSequenceDialog open={dialogOpen} handleClose={handleDialogClose} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sequencesLoading: state.sequences.sequencesLoading,
    sequences: state.sequences.sequences
  };
}

export default withSnackbar(connect(mapStateToProps)(SequencesComponent));
