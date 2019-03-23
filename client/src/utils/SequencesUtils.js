import {
  OnOffCommand,
  AllOffCommand,
  DimCommand
} from "./sequencesUtils/tests";

function commandToString(command, rooms) {
  console.log(`Command: ${command}`);
  if (OnOffCommand.test(command) === true) {
    return getRoomName(rooms, command.match(OnOffCommand)[1]);
  } else if (DimCommand.test(command) === true) {
    return getRoomName(rooms, command.match(DimCommand)[1]);
  } else if (AllOffCommand.test(command) === true) {
    return getRoomName(rooms, command.match(AllOffCommand)[1]);
  }
}

function getRoomName(rooms, roomId) {
  // console.log(roomId)
  // console.log(rooms )
  let roomName = "";
  rooms.map(room => {
    if (room.id == roomId) {
      roomName = room.name;
    } else {
      return room;
    }
  });
  return roomName;
}

// function getDeviceName(roomId, deviceId){
//   let deviceName = store.getState().rooms.map(room => {
//     if (room.id === roomId){
//       return room.devices.filter(device => device.id === deviceId)
//     }
//     else {
//       return room
//     }
//   })
//   return deviceName
// }

export default commandToString;
