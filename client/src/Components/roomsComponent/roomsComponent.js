import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RoomComponent from "../roomComponent/roomComponent";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import "./roomsComponent.css";
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
          rooms: resJson
        })
      );
  }
  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              classes={{
                root: "appText"
              }}
            >
              Ruimtes
            </Typography>
            <IconButton color={"inherit"}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
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
