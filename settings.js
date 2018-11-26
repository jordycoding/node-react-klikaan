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

module.exports = { settingsFileExists, getAllRooms };
