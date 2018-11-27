import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./roomsComponent.css";

class RoomsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
  }
  componentDidMount() {
    fetch("/getAllRooms")
      .then(res => res.json())
      .then(resJson => this.setState({ rooms: resJson }));
  }
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Ruimtes
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="rooms">
          {this.state.rooms.map(room => {
            if (room.status === "A") {
              return (
                <Card>
                  <CardContent>
                    <Typography color="textSecondary">{room.name}</Typography>
                    {room.devices.map(device => {
                      if (
                        device.status !== "I" &&
                        device.status !== "m" &&
                        device.status !== "o"
                      ) {
                        console.log(device.name);
                        return (
                          <Typography component="p">{device.name}</Typography>
                        );
                      }
                    })}
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
