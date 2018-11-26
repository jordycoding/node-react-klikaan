import React, { Component } from "react";
import LoginComponent from "./Components/loginComponent/loginComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
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
  render() {
    if (this.state.settingsFileExists) {
      return <p>Settings file exists</p>;
    } else {
      return <LoginComponent />;
    }
  }
}

export default App;
