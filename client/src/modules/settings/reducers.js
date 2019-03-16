import types from "./types";

const initialState = {
  settingsExists: false,
  settingsLoading: true
};

function settingsReducer(state = initialState, action) {
  switch (action.types) {
    case types.SET_EXISTS:
      return {
        ...state,
        settingsExists: action.exists
      };
    case types.SET_LOADING:
      return {
        ...state,
        settingsLoading: action.loading
      };
    default:
      return state;
  }
}

export default settingsReducer;
