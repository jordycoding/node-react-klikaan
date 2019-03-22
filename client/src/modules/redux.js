import roomsReducer from "./rooms/index";
import settingsReducer from "./settings/index";
import sequencesReducer from "./sequences/index"
import { combineReducers } from "redux";

const reducer = combineReducers({
  rooms: roomsReducer,
  settings: settingsReducer,
  sequences: sequencesReducer
});

export default reducer;
