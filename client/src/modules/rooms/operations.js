import actions from "./actions";
import { allOff } from "../../utils/api";

const setRoomsLoading = actions.setRoomsLoading;

function getRooms() {
  return function(dispatch) {
    dispatch(actions.setRoomsLoading(true));
    return fetch("/api/getAllRooms")
      .then(res => res.json())
      .then(resJson => {
        let rooms = resJson.map(room => {
          let newRoom = room;
          newRoom.allOffToggled = false;
          return room;
        });
        dispatch(actions.setRoomsLoading(false));
        dispatch(actions.setRooms(rooms));
      });
  };
}

function setRoomAllOff(id) {
  return function(dispatch) {
    dispatch(actions.setAllOff(id, true));
    return allOff(id)
      .then(res => res.text())
      .then(text => {
        if (text === "ok") {
          dispatch(actions.setAllOff(id, false));
        }
      });
  };
}

export default { setRoomsLoading, getRooms, setRoomAllOff };
