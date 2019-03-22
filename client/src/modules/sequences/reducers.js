import types from "./types";

const initialState = {
  sequencesLoading: false,
  sequences: []
};

function sequencesReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SEQUENCES_LOADING:
      return {
        ...state,
        sequencesLoading: action.loading
      };
    case types.SET_SEQUENCES:
      return {
        ...state,
        sequences: action.sequences
      };
    default:
      return state;
  }
}

export default sequencesReducer;
