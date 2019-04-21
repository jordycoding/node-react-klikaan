import types from "./types";

function setEditedSequenceTitle(title) {
  return {
    type: types.SET_EDITED_SEQUENCE_TITLE,
    title
  };
}

function setEditedSequenceCommands(commands) {
  return {
    type: types.SET_EDITED_SEQUENCE_COMMANDS,
    commands
  };
}

function removeCommandFromSequence(index) {
  return {
    type: types.REMOVE_COMMAND_FROM_SEQUENCE,
    index
  };
}

function changeWaitTime(time, index) {
  return {
    type: types.REMOVE_COMMAND_FROM_SEQUENCE,
    time
  };
}

function addCommandToSequence(command) {
  return {
    type: types.ADD_COMMAND_TO_SEQUENCE,
    command
  };
}

export default {
  setEditedSequenceTitle,
  setEditedSequenceCommands,
  removeCommandFromSequence,
  changeWaitTime,
  addCommandToSequence
};
