import React, { useEffect } from "react";
import { connect } from "react-redux";
import { sequencesOperations } from "../modules/sequences";
import { CircularProgress } from "@material-ui/core";

function SequencesComponent(props) {
  useEffect(() => {
    props.dispatch(sequencesOperations.getSequences());
  }, []);
  if (props.isLoading || props.sequences.length === 0) {
    return <CircularProgress />;
  } else {
    return (
      <ul>
        {props.sequences.map(sequence => (
          <li>{sequence.title}</li>
        ))}
      </ul>
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
