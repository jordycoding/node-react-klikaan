import types from "./types";

function setSettingsExists(exists) {
  return {
    type: types.SET_SETTINGS_EXISTS,
    exists
  };
}

function setSettingsLoading(loading) {
  return {
    type: types.SET_LOADING,
    loading
  };
}

export default { setSettingsExists, setSettingsLoading };
