const fetch = require("node-fetch");
const plist = require("plist");
const FormData = require("form-data");
const fs = require("fs");

const secret = "4beef6e4354fdeb384a8c5259e089623";

async function saveSettings(parameters) {
    let body = {};
    await fetch(`http://api.trustsmartcloud.com/getsettingsxml.php?action=D&email=${parameters.email}&pin=${parameters.pin}`)
        .then(res => res.text())
        .then(body => plist.parse(body))
        .then(parsed => body = parsed)
    let room = 0;
    let devicecounter = 0;
    let counter = 0;
    let rooms = []
    body.rooms.map((room, index) => {
        let newRoom = {}
        newRoom.name = room;
        newRoom.id = index + 1;
        newRoom.devices = [];
        rooms.push(newRoom)
    })
    body.deviceNames.map(device => {
        let newDevice = {}
        if (devicecounter < 9){
            devicecounter++
            newDevice.name = device;
            newDevice.status = body.deviceStatus[counter]
            newDevice.id = devicecounter;
            rooms[room].devices.push(newDevice);
            // console.log(`Device: ${device} Room: ${room} Status: ${body.deviceStatus[counter]} Id: ${devicecounter}`)
        }
        else if (devicecounter == 9) {
            // console.log(`Device: ${device} Room: ${room} Status: ${body.deviceStatus[counter]} Id: ${devicecounter}`)
            newDevice.name = device;
            newDevice.status = body.deviceStatus[counter]
            newDevice.id = devicecounter;
            rooms[room].devices.push(newDevice);
            devicecounter = 0;
            room++;
        }   
        counter++;   
    })
    let otherSettings = {
        email: body.settings[0],
        pin: body.settings[1],
        mac: body.settings[5]
    }
    let settings = [rooms, otherSettings]
    console.log(settings)
    fs.writeFile("settings.txt", JSON.stringify(settings), (err) => {
        if (err) throw err;
        console.log("Settings saved");
    })
}


function turnOn(deviceId, roomId){

}

exports.saveSettings = saveSettings