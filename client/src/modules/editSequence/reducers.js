import types from "./types";

const initialState = {
  sequenceTitle: "",
  sequenceCommands: []
};

function editsequenceReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_EDITED_SEQUENCE_TITLE:
      return {
        ...state,
        sequenceTitle: action.title
      };
    case types.SET_EDITED_SEQUENCE_COMMANDS:
      return {
        ...state,
        sequenceCommands: action.commands
      };
    case types.REMOVE_COMMAND_FROM_SEQUENCE:
      return {
        ...state,
        sequenceCommands: state.sequenceCommands.filter(
          (command, index) => index != action.index
        )
      };
    case types.CHANGE_WAIT_TIME:
      return {
        ...state,
        sequenceCommands: state.sequenceCommands.map((command, index) => {
          console.log(action)
          if (index == action.index) {
            return  `${command.split(",")[0]},${action.time}`;
          } else {
            return command
          }
        })
      };
    case types.ADD_COMMAND_TO_SEQUENCE:
      return {
        ...state,
        sequenceCommands: [...state.sequenceCommands, action.command]
      };
    default:
      return state;
  }
}

export default editsequenceReducer;
