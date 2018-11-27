import React, { Component } from "react";

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
      <div>
        {this.state.rooms.map(room => {
          if (room.status === "A") {
            return (
              <>
                <h1>{room.name}</h1>
                {room.devices.map(device => {
                  if (
                    device.status !== "I" &&
                    device.status !== "m" &&
                    device.status !== "o"
                  ) {
                    console.log(device.name);
                    return <p>{device.name}</p>;
                  }
                })}
              </>
            );
          }
        })}
      </div>
    );
  }
}

export default RoomsComponent;
