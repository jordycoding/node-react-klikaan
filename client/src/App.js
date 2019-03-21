import React, { Component } from "react";
import LoginComponent from "./pages/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { settingsOperations } from "./modules/settings";
import { roomsOperations } from "./modules/rooms";
import HomeComponent from "./pages/HomeComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(settingsOperations.checkSettingsExists()).then(() => {
      if (this.props.settingsFileExists) {
        this.props.dispatch(roomsOperations.getRooms());
      }
    });
  }
  render() {
    if (
      this.props.settingsLoading === true ||
      this.props.roomsLoading === true ||
      (this.props.roomsLoading === true && this.props.settingsLoading === true)
    ) {
      return (
        <div className="loading">
          <CircularProgress />
        </div>
      );
    } else if (
      this.props.settingsFileExists === false &&
      this.props.settingsLoading === false
    ) {
      return <LoginComponent />;
    } else if (
      this.props.roomsLoading === false &&
      this.props.settingsFileExists === true
    ) {
      return <HomeComponent />;
    } else {
      return <p>Error</p>;
    }
  }
}

function mapStateToProps(state) {
  return {
    settingsFileExists: state.settings.settingsExists,
    settingsLoading: state.settings.loading,
    roomsLoading: state.rooms.loading,
    rooms: state.rooms.rooms
  };
}

export default connect(mapStateToProps)(App);
