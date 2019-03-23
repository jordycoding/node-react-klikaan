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

const DimToString = (dimValue, deviceName) => `Zet ${deviceName} op ${dimValue / 0.01 / 32}`
const OnOffToString(powerState, deviceName) => `Zet ${deviceName} ${powerState == 1 ? "Aan" : "Uit"}`

function getRoomName(rooms, roomId) {
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

function getDeviceName(rooms, roomId, deviceId) {
  let deviceName = "";
  rooms.map(room => {
    if (room.id == roomId) {
      console.log("room match");
      room.devices.map(device => {
        if (device.id == deviceId) {
          deviceName = device.name;
        } else {
          return device;
        }
      });
    } else {
      return room;
    }
  });
  return deviceName;
}

export default commandToString;
