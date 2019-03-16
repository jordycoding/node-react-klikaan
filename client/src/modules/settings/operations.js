import actions from "./actions";

const setSettingsLoading = actions.setSettingsLoading;

function checkSettingsExists(exists) {
  return function(dispatch) {
    return fetch("/settingsFileExists")
      .then(res => res.json())
      .then(json => {
        if (json === true) {
          dispatch(actions.setSettingsExists(true));
          dispatch(actions.setSettingsLoading(false));
        } else {
        }
      });
  };
}

export default { setSettingsLoading, checkSettingsExists };
