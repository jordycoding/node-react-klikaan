import types from "./types";

function setExists(exists) {
  return {
    type: types.SET_EXISTS,
    exists
  };
}

function setLoading(loading) {
  return {
    type: types.SET_LOADING,
    loading
  };
}

export default { setExists, setLoading };
