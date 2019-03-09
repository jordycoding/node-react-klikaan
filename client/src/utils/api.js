function turnOn(deviceId, roomId) {
  let body = { deviceId: deviceId, roomId: roomId };
  fetch("/turnOn", {
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
  fetch("/turnOff", {
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
  fetch("/dim", {
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
  return fetch("/allOff", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function removeSettings(callback) {
  fetch("/removeSettings", {
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

export { turnOn, turnOff, dim, removeSettings, allOff };
