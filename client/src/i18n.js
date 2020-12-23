import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en:{
        translation:{
            "Rooms" : "Rooms",
            "Sequences": "Sequences",
            "on": "On",
            "off": "Off",
            "all off": "All off",
            "Save settings to server": "Save settings to server",
            "Refresh settings": "Refresh settings",
            "Stop all sequences": "Stop all sequences",
            "settings": "Settings",
            "save": "Save",
            "new sequence": "New sequence",
            "name": "Name",
            "room": "Room",
            "device": "Device",
            "add": "Add",
            "cancel": "Cancel",
            "add command": "Add command",
            "wait time": "Waiting time in HH:MM:SS",
            "edit sequence": "Edit sequence",
            "turn": "Turn",
            "to": "To",
            "turn everything in": "Turn everything in",
            "wait": "Wait",
            "change delay": "Change delay",
            "input delay": "Input the new delay in the format: HH:MM:SS",
            "confirm change": "Confirm change",
            "change language": "Change language(en/nl)",
            "delay": "Delay"
        }
    },
    nl: {
        translation:{
            "Rooms" : "Kamers",
            "Sequences": "Scenes",
            "on": "Aan",
            "off": "Ait",
            "all off": "Alles uit",
            "Save settings to server": "Sla instellingen op op server",
            "Refresh settings": "Haal instellingen op van server",
            "Stop all sequences": "Stop alle scenes",
            "settings": "Instellingen",
            "save": "Opslaan",
            "new sequence": "Nieuwe scene",
            "name": "Naam",
            "room": "Kamer",
            "device": "Apparaat",
            "add": "Toevoegen",
            "cancel": "Annuleren",
            "add command": "Commando toevoegen",
            "wait time": "Wachttijd in HH:MM:SS",
            "edit sequence": "Bewerk scene",
            "turn": "Zet",
            "to": "Op",
            "turn everything in": "Zet alles in",
            "wait": "Wacht",
            "change delay": "Wachttijd aanpassen",
            "input delay": "Voer de nieuwe wachttijd in in het formaat: HH:MM:SS",
            "confirm change": "Bevestigen",
            "change language": "Verander taal(en/nl)",
            "delay": "Wachttijd"
        }
    }
}
i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation:{
        escapeValue: false
    }
})

export default i18n