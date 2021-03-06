import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login/login.css";
import { settingsOperations } from "../modules/settings";
import { roomsOperations } from "../modules/rooms";
import { connect } from "react-redux";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }
  handleSubmit() {
    let data = {
      email: this.state.email,
      pin: this.state.pin
    };
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(text => {
        if (text === "ok") {
          console.log("ok");
          this.props.dispatch(roomsOperations.getRooms());
          this.props.dispatch(settingsOperations.setSettingsExists(true));
        }
      });
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handlePin(event) {
    this.setState({
      pin: event.target.value
    });
  }
  render() {
    return (
      <div className="login">
        <Paper>
          <form className="loginForm">
            <p>Node-react-klikaan</p>
            <TextField
              label="Email"
              margin="normal"
              name="email"
              onChange={this.handleEmail}
            />
            <TextField
              label="Pin"
              margin="normal"
              name="pin"
              type="password"
              onChange={this.handlePin}
            />
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    settingsFileExists: state.settings.settingsExists
  };
}

export default connect(mapStateToProps)(LoginComponent);
