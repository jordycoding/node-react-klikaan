import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "./rooms/Room";
import "./rooms/rooms.css";
import AppToolbar from "../components/AppToolbar";
import { connect } from "react-redux";
import { roomsOperations } from "../modules/rooms/index";
import { settingsOperations } from "../modules/settings";
class RoomsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(roomsOperations.getRooms());
  }
  render() {
    return (
      <>
        <AppToolbar
          checkSettingsFile={() =>
            this.props.dispatch(settingsOperations.checkSettingsExists())
          }
        />
        {this.props.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="rooms">
            {this.props.rooms.map(room => {
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
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms,
    isLoading: state.rooms.isLoading
  };
}
export default connect(mapStateToProps)(RoomsComponent);
