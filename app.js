const inquirer = require("inquirer");
const program = require("commander");
const api = require("./api");
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

inquirer
  .prompt(savePrompt)
  .then(saveparameters => api.saveSettings(saveparameters));

app.listen(5000, () => {
  console.log("App started on port 5000");
});
