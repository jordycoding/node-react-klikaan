import types from "./types";

function setRooms(rooms) {
  return {
    type: types.SET_ROOMS,
    rooms
  };
}

function setRoomsLoading(loading) {
  return {
    type: types.SET_ROOMS_LOADING,
    loading
  };
}

function setAllOff(roomId, allOffValue) {
  return {
    type: types.SET_ALL_OFF,
    roomId,
    allOffValue
  };
}

export default { setRooms, setRoomsLoading, setAllOff };
