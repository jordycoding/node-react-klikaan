import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "./rooms/Room";
import "./rooms/rooms.css";
import AppToolbar from "../components/AppToolbar";
class RoomsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }
  componentDidMount() {
    fetch("/getAllRooms")
      .then(res => res.json())
      .then(resJson =>
        this.setState({
          rooms: resJson,
          dialogOpen: false
        })
      );
  }
  render() {
    return (
      <>
        <AppToolbar checkSettingsFile={this.props.checkSettingsFile} />
        <div className="rooms">
          {this.state.rooms.map(room => {
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
      </>
    );
  }
}

export default RoomsComponent;
