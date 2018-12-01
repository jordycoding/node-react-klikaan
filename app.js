const api = require("./api");
const settings = require("./settings.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.listen(5000, () => {
  console.log("App started on port 5000");
});
app.get("/settingsFileExists", (req, res) => {
  res.send(settings.settingsFileExists());
});
app.get("/getAllRooms", (req, res) => {
  res.send(settings.getAllRooms());
});
app.post("/login", (req, res) => {
  api.saveSettings(req.body.email, req.body.pin, () => {
    res.send("ok");
  });
});
app.post("/turnOn", (req, res) => {
  api.turnOn(req.body.deviceId, req.body.roomId);
});
app.post("/turnOff", (req, res) => {
  api.turnOff(req.body.deviceId, req.body.roomId);
});
app.post("/dim", (req, res) => {
  api.dim(req.body.deviceId, req.body.roomId, req.body.value);
});
app.post("/removeSettings", (req, res) => {
  console.log("Removing settings");
  settings.removeSettingsFile(() => res.send("removed"));
});
