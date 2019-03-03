import { createStore } from "redux";
import roomsReducer from "./modules/rooms";

const store = createStore(
  roomsReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
