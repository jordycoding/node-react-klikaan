import types from "./types";

const initialState = {
  settingsExists: false,
  settingsLoading: true
};

function settingsReducer(state = initialState, action) {
  switch (action.types) {
    case types.SET_SETTINGS_EXISTS:
      console.log("Setting settings exists");
      return {
        ...state,
        settingsExists: action.exists
      };
    case types.SET_SETTINGS_LOADING:
      return {
        ...state,
        settingsLoading: action.loading
      };
    default:
      return state;
  }
}

export default settingsReducer;