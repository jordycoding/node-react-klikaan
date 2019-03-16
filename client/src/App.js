import React, { Component } from "react";
import LoginComponent from "./pages/Login";
import RoomsComponent from "./pages/Rooms";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { settingsOperations } from "./modules/settings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reloadState = this.reloadState.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(settingsOperations.checkSettingsExists());
  }
  reloadState() {
    this.props.dispatch(settingsOperations.checkSettingsExists());
  }

  render() {
    switch (this.props.settingsFileExists) {
      case true:
        return <RoomsComponent />;
      case false:
        return (
          <LoginComponent
            afterSubmit={() =>
              this.props.dispatch(settingsOperations.checkSettingsExists())
            }
          />
        );
      default:
        return (
          <div className="loading">
            <CircularProgress />
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return {
    settingsFileExists: state.settings.settingsExists
  };
}

export default connect(mapStateToProps)(App);
