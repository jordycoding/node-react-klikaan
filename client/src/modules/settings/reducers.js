import types from "./types";

const initialState = {
  settingsExists: false,
  settingsLoading: true
};

function settingsReducer(state = initialState, action) {
  console.log("Settings reducer");
  switch (action.types) {
    case types.SET_SETTINGS_EXISTS:
      console.log(action);
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
      console.log(action);
      return state;
  }
}

export default settingsReducer;
