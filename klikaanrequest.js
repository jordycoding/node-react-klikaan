const FormData = require("form-data");
const fetch = require("node-fetch");

class KlikaanRequest {
  constructor(name, email) {
    this.secret = "4beef6e4354fdeb384a8c5259e089623";
    this.commandUrl = "https://api.trustsmartcloud.com/writerecord.php?";
    this.username = "JSiPhone";
    this.action = "I";
    this.name = name;
    this.email = email;
  }
  executeCommand(command) {
    let body = new FormData();
    body.append("action", "I");
    body.append("username", "JSiPhone");
    body.append("secret", this.secret);
    body.append("name", this.name);
    body.append("email", this.email);
    body.append("commandstring", command);
    fetch("https://api.trustsmartcloud.com/writerecord.php?", {
      method: "POST",
      body: body
    });
  }
}

module.exports = KlikaanRequest;
