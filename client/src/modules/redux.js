import roomsReducer from "./rooms/index";
import settingsReducer from "./settings/index";
import { combineReducers } from "redux";

const reducer = combineReducers({
  rooms: roomsReducer,
  settings: settingsReducer
});

export default reducer;
