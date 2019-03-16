import React, { Component } from "react";
import LoginComponent from "./pages/Login";
import RoomsComponent from "./pages/Rooms";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { settingsActions } from "./modules/settings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reloadState = this.reloadState.bind(this);
    this.checkSettingsFile = this.checkSettingsFile.bind(this);
  }
  componentDidMount() {
    this.checkSettingsFile();
  }
  checkSettingsFile() {
    console.log("Checking settings file");
    fetch("/settingsFileExists")
      .then(res => res.text())
      .then(text => {
        this.props.dispatch(settingsActions.setSettingsExists(true));
      });
  }
  reloadState() {
    this.checkSettingsFile();
  }

  render() {
    switch (this.props.settingsFileExists) {
      case true:
        return <RoomsComponent checkSettingsFile={this.checkSettingsFile} />;
      case false:
        return <LoginComponent afterSubmit={this.checkSettingsFile} />;
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
