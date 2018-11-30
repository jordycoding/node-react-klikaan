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
  console.log(JSON.stringify(body));
  fetch("/dim", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
}

function removeSettings() {
  fetch("/removeSettings", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

export { turnOn, turnOff, dim };
