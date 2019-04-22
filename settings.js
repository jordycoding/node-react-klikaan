const fs = require("fs");

function settingsFileExists() {
  try {
    fs.statSync("settings.txt");
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
  }
}

function getAllRooms() {
  let rooms = JSON.parse(fs.readFileSync("settings.txt")).rooms;
  return rooms;
}

function getAllSequences() {
  let sequences = JSON.parse(fs.readFileSync("settings.txt")).sequences;
  return sequences;
}
function getEmail() {
  let email = JSON.parse(fs.readFileSync("settings.txt")).email;
  return email;
}

function getMac() {
  let mac = JSON.parse(fs.readFileSync("settings.txt")).mac;
  return mac;
}

function getPin() {
  let pin = JSON.parse(fs.readFileSync("settings.txt")).pin;
  return pin;
}

function removeSettingsFile(callback) {
  fs.unlink("settings.txt", () => callback());
}

module.exports = {
  settingsFileExists,
  getAllRooms,
  getAllSequences,
  getEmail,
  getMac,
  getPin,
  removeSettingsFile
};
