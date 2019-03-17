import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "./rooms/Room";
import "./rooms/rooms.css";
import AppToolbar from "../components/AppToolbar";
import { connect } from "react-redux";
import { settingsOperations } from "../modules/settings";
function RoomsComponent(props) {
  return (
    <>
      <AppToolbar
        checkSettingsFile={() =>
          props.dispatch(settingsOperations.checkSettingsExists())
        }
      />
      {props.isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="rooms">
          {props.rooms.map(room => {
            if (room.status === "A") {
              return (
                <Card key={room.id}>
                  <CardContent>
                    <RoomComponent room={room} />
                  </CardContent>
                </Card>
              );
            }
          })}
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms,
    isLoading: state.rooms.isLoading
  };
}
export default connect(mapStateToProps)(RoomsComponent);
