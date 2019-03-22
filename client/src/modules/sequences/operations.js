import actions from "./actions";

function getSequences() {
  return function(dispatch) {
    dispatch(actions.setSequencesLoading(true));
    return fetch("/getAllSequences")
      .then(res => res.json())
      .then(resJson => {
        dispatch(actions.setSequences(resJson));
        dispatch(actions.setSequencesLoading(false));
      });
  };
}

export default { getSequences };
