const FormData = require("form-data");
const fetch = require("node-fetch");

class KlikaanRequest {
  secret = "4beef6e4354fdeb384a8c5259e089623";
  commandUrl = "https://api.trustsmartcloud.com/writerecord.php?";
  username = "JSiPhone";
  action = "I";
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  executeCommand(command) {
    let body = new FormData();
    body.append("action", "I");
    body.append("username", "JSiPhone");
    body.append("secret", secret);
    body.append("name", this.name);
    body.append("email", this.email);
    body.append("commandstring", command);
    return fetch("https://api.trustsmartcloud.com/writerecord.php?", {
      method: "POST",
      body: body
    });
  }
}

module.exports = KlikaanRequest;
