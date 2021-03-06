import actions from "./actions";

const setSettingsLoading = actions.setSettingsLoading;
const setSettingsExists = actions.setSettingsExists;

function checkSettingsExists() {
  return function(dispatch) {
    dispatch(actions.setSettingsLoading(true));
    return fetch("/api/settingsFileExists")
      .then(res => res.json())
      .then(json => {
        if (json === true) {
          dispatch(actions.setSettingsExists(true));
          dispatch(actions.setSettingsLoading(false));
        } else {
          dispatch(actions.setSettingsExists(false));
          dispatch(actions.setSettingsLoading(false));
        }
      });
  };
}

export default { setSettingsLoading, setSettingsExists, checkSettingsExists };
