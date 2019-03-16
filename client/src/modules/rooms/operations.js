import actions from "./actions";
import { allOff } from "../../utils/api";

const setRoomsLoading = actions.setRoomsLoading;

function getRooms() {
  return function(dispatch) {
    return fetch("/getAllRooms")
      .then(res => res.json())
      .then(resJson => {
        let rooms = resJson.map(room => {
          let newRoom = room;
          newRoom.allOffToggled = false;
          return room;
        });
        dispatch(actions.setRooms(rooms));
      });
  };
}

function setRoomAllOff(id) {
  return function(dispatch) {
    return allOff(id)
      .then(res => {
        console.log("All off");
        res.text();
      })
      .then(text => {
        if (text === "ok") {
          dispatch(actions.setAllOff(id, false));
        }
      });
  };
}

export default { setRoomsLoading, getRooms, setRoomAllOff };
