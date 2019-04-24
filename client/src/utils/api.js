const baseUrl = "/api";

function turnOn(deviceId, roomId) {
  let body = { deviceId: deviceId, roomId: roomId };
  fetch(baseUrl + "/turnOn", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function turnOff(deviceId, roomId) {
  let body = { deviceId: deviceId, roomId: roomId };
  fetch(baseUrl + "/turnOff", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function dim(deviceId, roomId, value) {
  let body = { deviceId: deviceId, roomId: roomId, value: value };
  fetch(baseUrl + "/dim", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function allOff(roomId) {
  let body = { roomId: roomId };
  return fetch(baseUrl + "/allOff", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function startSequence(id) {
  let body = { sequenceId: id };
  return fetch(baseUrl + "/startSequence", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function addSequence(title, commands) {
  let body = {
    title: title,
    commands: commands
  };
  console.log(body);
  return fetch(baseUrl + "/addSequence", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function stopAllSequences() {
  return fetch(baseUrl + "/stopAllSequences", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

function removeSequence(name) {
  let body = { sequenceName: name };
  return fetch(baseUrl + "/removeSequence", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function removeSettings(callback) {
  fetch(baseUrl + "/removeSettings", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(text => {
      if (text === "removed") {
        callback();
      }
    });
}

function saveSettingsToServer() {
  return fetch(baseUrl + "/saveSettingsToServer", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

export {
  turnOn,
  turnOff,
  dim,
  removeSettings,
  allOff,
  startSequence,
  stopAllSequences,
  saveSettingsToServer,
  removeSequence,
  addSequence
};
