import React, { Component } from "react";
import LoginComponent from "./pages/Login";
import RoomsComponent from "./pages/Rooms";

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
    fetch("/settingsFileExists")
      .then(res => res.text())
      .then(text => {
        if (text === "true") {
          this.setState({ settingsFileExists: true });
        } else {
          this.setState({ settingsFileExists: false });
        }
      });
  }
  reloadState() {
    this.checkSettingsFile();
  }

  render() {
    switch (this.state.settingsFileExists) {
      case true:
        return <RoomsComponent checkSettingsFile={this.checkSettingsFile} />;
      case false:
        return <LoginComponent afterSubmit={this.checkSettingsFile} />;
      default:
        return (
          <div className="loading">
            <p>Loading...</p>
          </div>
        );
    }
  }
}

export default App;
