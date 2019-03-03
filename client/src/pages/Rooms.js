import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "./rooms/Room";
import "./rooms/rooms.css";
import AppToolbar from "../components/AppToolbar";
import { connect } from "react-redux";
import { setRooms, setLoading } from "../modules/rooms";
class RoomsComponent extends Component {
  componentDidMount() {
    this.props.dispatch(setLoading(true));
    fetch("/getAllRooms")
      .then(res => res.json())
      .then(resJson => {
        this.props.dispatch(setRooms(resJson));
        this.props.dispatch(setLoading(false));
      });
  }
  render() {
    return (
      <>
        <AppToolbar checkSettingsFile={this.props.checkSettingsFile} />
        {this.props.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="rooms">
            {this.props.rooms.map(room => {
              if (room.status === "A") {
                return (
                  <Card>
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
    rooms: state.rooms,
    isLoading: state.isLoading
  };
}
export default connect(mapStateToProps)(RoomsComponent);
