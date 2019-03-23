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
  IconButton
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { startSequence } from "../utils/api";
import EditSequenceDialog from "./sequences/EditSequenceDialog";
import { stopAllSequences } from "../utils/api";
import "./sequences/sequences.css";

function SequencesComponent(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedSequence, setEditedSequence] = useState({});
  function handleDialogClose() {
    setDialogOpen(false);
  }
  function editSequence(sequence) {
    setEditedSequence(sequence);
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
                  <IconButton onClick={() => editSequence(sequence)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <EditSequenceDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          sequence={editedSequence}
        />
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

export default connect(mapStateToProps)(SequencesComponent);
