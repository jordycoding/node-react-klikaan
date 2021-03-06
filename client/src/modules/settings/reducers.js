import types from "./types";

const initialState = {
  settingsExists: false,
  loading: true
};

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SETTINGS_EXISTS: {
      return {
        ...state,
        settingsExists: action.exists
      };
    }
    case types.SET_SETTINGS_LOADING: {
      return {
        ...state,
        loading: action.loading
      };
    }
    default:
      return state;
  }
}

export default settingsReducer;
