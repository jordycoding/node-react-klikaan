import {
  OnOffCommand,
  AllOffCommand,
  DimCommand
} from "./sequencesUtils/tests";

function commandToString(command, rooms) {
  if (OnOffCommand.test(command) === true) {
    return OnOffToString(
      command.match(OnOffCommand)[3],
      getDeviceName(
        rooms,
        command.match(OnOffCommand)[1],
        command.match(OnOffCommand)[2]
      )
    );
  } else if (DimCommand.test(command) === true) {
    return DimToString(
      command.match(DimCommand)[3],
      getDeviceName(
        rooms,
        command.match(DimCommand)[1],
        command.match(DimCommand)[2]
      )
    );
  } else if (AllOffCommand.test(command) === true) {
    return AllOffToString(getRoomName(command, rooms));
  }
}

const DimToString = (dimValue, deviceName) =>
  `Zet ${deviceName} op ${Math.round(dimValue / 0.01 / 32)}`;
const OnOffToString = (powerState, deviceName) =>
  `Zet ${deviceName} ${powerState == 1 ? "Aan" : "Uit"}`;
const AllOffToString = roomName => `Zet alles in ${roomName} uit`;

function getRoomName(command, rooms) {
  let roomName = "";
  let roomId;
  if (OnOffCommand.test(command) === true) {
    roomId = command.match(OnOffCommand)[1];
  } else if (DimCommand.test(command) === true) {
    roomId = command.match(DimCommand)[1];
  } else if (AllOffCommand.test(command) === true) {
    roomId = command.match(AllOffCommand)[1];
  }
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
export { getRoomName };
