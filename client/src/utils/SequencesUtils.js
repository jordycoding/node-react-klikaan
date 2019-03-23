import store from "../store";
import {OnOffCommand, AllOffCommand, DimCommand} from "./sequencesUtils/tests";

function commandToString(command) {
  if (OnOffCommand.test(command) === true){
    console.log("On off command on room:");
    console.log(getRoomName(command.match(OnOffCommand)[1]))
  } else if (DimCommand.test(command) === true){
    console.log("Dim command on room:")
    console.log(getRoomName(command.match(DimCommand)[1]))
  } else if (AllOffCommand.test(command) === true){
    console.log("All off command on room")
    console.log(getRoomName(command.match(AllOffCommand)[1]))
  }
}

function getRoomName(roomId){
  let roomName = store.getState().rooms.filter(room => room.id === roomId)
  return roomName;
}

function getDeviceName(roomId, deviceId){
  let deviceName = store.getState().rooms.map(room => {
    if (room.id === roomId){
      return room.devices.filter(device => device.id === deviceId)
    }
    else {
      return room
    }
  })
  return deviceName
}

export default commandToString