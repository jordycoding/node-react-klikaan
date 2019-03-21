import React from "react";
import { connect } from "react-redux";

function SequencesComponent(props) {
  return (
    <p>Scenes</p>
  );
}


export default connect()(SequencesComponent);