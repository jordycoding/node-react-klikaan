import React, { Component } from "react";
import LoginComponent from "./Components/loginComponent/loginComponent";
import RoomsComponent from "./Components/roomsComponent/roomsComponent";

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
    if (this.state.settingsFileExists) {
      return <RoomsComponent />;
    } else {
      return <LoginComponent afterSubmit={this.checkSettingsFile} />;
    }
  }
}

export default App;
