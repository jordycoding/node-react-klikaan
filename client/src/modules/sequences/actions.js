import types from "./types"

function setSequences(sequences){
  return {
    type: types.SET_SEQUENCES,
    sequences
  }
}

function setSequencesLoading(loading){
  return {
    type: types.SET_SEQUENCES_LOADING,
    loading
  }
}

export default {setSequences, setSequencesLoading}