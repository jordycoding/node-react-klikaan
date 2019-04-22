const express = require("express");
const router = express.Router();
const api = require("./api");
const settings = require("./settings.js");

router.get("/settingsFileExists", (req, res) => {
  res.send(settings.settingsFileExists());
});
router.get("/getAllRooms", (req, res) => {
  res.send(settings.getAllRooms());
});
router.get("/getAllSequences", (req, res) => {
  res.send(settings.getAllSequences());
});
router.post("/login", (req, res) => {
  api.saveSettings(req.body.email, req.body.pin, () => {
    res.send("ok");
  });
});
router.post("/turnOn", (req, res) => {
  api.turnOn(req.body.deviceId, req.body.roomId);
});
router.post("/turnOff", (req, res) => {
  api.turnOff(req.body.deviceId, req.body.roomId);
});
router.post("/dim", (req, res) => {
  api.dim(req.body.deviceId, req.body.roomId, req.body.value);
});
router.post("/allOff", (req, res) => {
  api.allOff(req.body.roomId);
  res.send("ok");
});
router.post("/startSequence", (req, res) => {
  api.startSequence(req.body.sequenceId);
  res.send("ok");
});
router.post("/stopAllSequences", (req, res) => {
  api.stopAllSequences();
  res.send("ok");
});
router.post("/removeSettings", (req, res) => {
  settings.removeSettingsFile(() => res.send("removed"));
});
router.post("/editSequence", (req, res) => {
  api
    .editSequence(req.body.sequenceTitle, req.body.sequenceCommands)
    .then(response => res.sendStatus(response.status));
});
router.post("/removeSequence", (req, res) => {
  api
    .removeSequence(req.body.sequenceName)
    .then(response => res.sendStatus(response.status));
});
router.post("/saveSettingsToServer", (req, res) => {
  api.saveSettingsToServer();
  res.sendStatus(200);
});

module.exports = router;
