const inquirer = require("inquirer");
const program = require("commander");
const api = require("./api");
const settings = require("./settings.js");
const express = require("express");

const app = express();

const savePrompt = [
  {
    type: "input",
    name: "email",
    message: "Enter email adress..."
  },
  {
    type: "input",
    name: "pin",
    message: "Enter your lightwaverf pin code"
  }
];

if (!settings.settingsFileExists()) {
  inquirer
    .prompt(savePrompt)
    .then(saveparameters => api.saveSettings(saveparameters));
}

app.listen(5000, () => {
  console.log("App started on port 5000");
});

app.get("/getAllRooms", (req, res) => {
  res.send(settings.getAllRooms());
});
