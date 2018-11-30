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
  fetch("/dim", { method: "POST", body: JSON.stringify(body) });
}

export { turnOn, turnOff, dim };
