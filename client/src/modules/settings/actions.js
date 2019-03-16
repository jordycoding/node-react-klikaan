import types from "./types";

function setSettingsExists(exists) {
  let action = {
    type: types.SET_SETTINGS_EXISTS,
    exists
  };
  console.log(action);
  return action;
}

function setSettingsLoading(loading) {
  return {
    type: types.SET_LOADING,
    loading
  };
}

export default { setSettingsExists, setSettingsLoading };
