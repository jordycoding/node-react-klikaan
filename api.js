const fetch = require("node-fetch");
const plist = require("plist");
const FormData = require("form-data");
const fs = require("fs");
const settings = require("./settings");

const secret = "4beef6e4354fdeb384a8c5259e089623";

async function saveSettings(email, pin, callback) {
  let body = {};
  await fetch(
    `http://api.trustsmartcloud.com/getsettingsxml.php?action=D&email=${email}&pin=${pin}`
  )
    .then(res => res.text())
    .then(body => plist.parse(body))
    .then(parsed => (body = parsed));
  let room = 0;
  let devicecounter = 0;
  let counter = 0;
  let rooms = [];
  body.rooms.map((room, index) => {
    let newRoom = {};
    newRoom.name = room;
    newRoom.status = body.roomStatus[index];
    newRoom.id = index + 1;
    newRoom.devices = [];
    rooms.push(newRoom);
  });
  body.deviceNames.map(device => {
    let newDevice = {};
    if (devicecounter < 9) {
      devicecounter++;
      newDevice.name = device;
      newDevice.status = body.deviceStatus[counter];
      newDevice.id = devicecounter;
      rooms[room].devices.push(newDevice);
      // console.log(`Device: ${device} Room: ${room} Status: ${body.deviceStatus[counter]} Id: ${devicecounter}`)
    } else if (devicecounter == 9) {
      // console.log(`Device: ${device} Room: ${room} Status: ${body.deviceStatus[counter]} Id: ${devicecounter}`)
      newDevice.name = device;
      newDevice.status = body.deviceStatus[counter];
      newDevice.id = devicecounter;
      rooms[room].devices.push(newDevice);
      devicecounter = 0;
      room++;
    }
    counter++;
  });
  let otherSettings = {
    email: body.settings[0],
    pin: body.settings[1],
    mac: body.settings[5]
  };
  let settings = {
    rooms: rooms,
    email: body.settings[0],
    pin: body.settings[1],
    mac: body.settings[5]
  };
  fs.writeFile("settings.txt", JSON.stringify(settings), err => {
    if (err) throw err;
    callback();
  });
}

function turnOn(deviceId, roomId) {
  let body = new FormData();
  body.append("action", "I");
  body.append("username", "JSiPhone");
  body.append("secret", secret);
  body.append("name", settings.getMac());
  body.append("email", settings.getEmail());
  body.append("commandstring", `!R${roomId}D${deviceId}F1`);
  fetch("https://api.trustsmartcloud.com/writerecord.php?", {
    method: "POST",
    body: body
  });
}

function turnOff(deviceId, roomId) {
  let body = new FormData();
  body.append("action", "I");
  body.append("username", "JSiPhone");
  body.append("secret", secret);
  body.append("name", settings.getMac());
  body.append("email", settings.getEmail());
  body.append("commandstring", `!R${roomId}D${deviceId}F0`);
  fetch("https://api.trustsmartcloud.com/writerecord.php?", {
    method: "POST",
    body: body
  });
}

function dim(deviceId, roomId, value) {
  let dimValue = value * 0.01 * 32;
  let body = new FormData();
  body.append("action", "I");
  body.append("username", "JSiPhone");
  body.append("secret", secret);
  body.append("name", settings.getMac());
  body.append("email", settings.getEmail());
  body.append("commandstring", `!R${roomId}D${deviceId}FdP${dimValue}`);
}

module.exports = { saveSettings, turnOn, turnOff, dim };
