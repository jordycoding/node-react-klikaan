const initialState = {
  rooms: [],
  isLoading: false
};

function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ROOMS":
      return {
        ...state,
        rooms: action.rooms
      };
    case "SET_ROOMS_LOADING":
      return {
        ...state,
        isLoading: action.loading
      };
    default:
      return state;
  }
}

function setRooms(rooms) {
  return {
    type: "SET_ROOMS",
    rooms
  };
}

function setLoading(loading) {
  return {
    type: "SET_ROOMS_LOADING",
    loading
  };
}

export default roomsReducer;
export { setRooms, setLoading };
