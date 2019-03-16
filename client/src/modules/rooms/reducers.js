import types from "./types";

const initialState = {
  rooms: [],
  loading: false
};

function roomsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_ROOMS:
      return { ...state, rooms: action.rooms };
    case types.SET_ROOMS_LOADING:
      return { ...state, loading: action.loading };
    case types.SET_ALL_OFF:
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

export default roomsReducer;
