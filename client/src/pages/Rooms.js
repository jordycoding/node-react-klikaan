import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "./rooms/Room";
import "./rooms/rooms.css";
import { connect } from "react-redux";
function RoomsComponent(props) {
  return (
    <div style={{ display: props.hidden ? "none" : "block" }}>
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms,
    isLoading: state.rooms.isLoading
  };
}
export default connect(mapStateToProps)(RoomsComponent);
