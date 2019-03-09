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
    case "SET_ALL_OFF":
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.id === action.roomId) {
            return {
              ...room,
              allOffToggled: action.allOffValue
            };
          } else {
            return room;
          }
        })
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

function setAllOff(roomId, allOffValue) {
  return {
    roomId,
    allOffValue
  };
}

export default roomsReducer;
export { setRooms, setLoading, setAllOff };
