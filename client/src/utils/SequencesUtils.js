import {
  OnOffCommand,
  AllOffCommand,
  DimCommand
} from "./sequencesUtils/tests";
import i18n from "../i18n";

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
  `${i18n.t("turn")} ${deviceName} ${i18n.t("to")} ${Math.round(dimValue / 0.01 / 32)}`;
const OnOffToString = (powerState, deviceName) =>
  `${i18n.t("turn")} ${deviceName} ${powerState == 1 ? i18n.t("on").toLowerCase() : i18n.t("off").toLowerCase()}`;
const AllOffToString = roomName => `${i18n.t("turn everything in")} ${roomName} ${i18n.t("off").toLowerCase()}`;

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
