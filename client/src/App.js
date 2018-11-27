import React, { Component } from "react";
import LoginComponent from "./Components/loginComponent/loginComponent";

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
      return <p>Settings file exists</p>;
    } else {
      return <LoginComponent afterSubmit={this.checkSettingsFile} />;
    }
  }
}

export default App;
