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

function getEmail() {
  let email = JSON.parse(fs.readFileSync("settings.txt")).email;
  return email;
}

function getMac() {
  let mac = JSON.parse(fs.readFileSync("settings.txt")).mac;
  return mac;
}

module.exports = { settingsFileExists, getAllRooms, getEmail, getMac };
