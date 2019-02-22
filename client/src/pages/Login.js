import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login/login.css";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePin = this.handlePin.bind(this);
    this.handleTest = this.handleTest.bind(this);
  }
  handleSubmit() {
    let data = {
      email: this.state.email,
      pin: this.state.pin
    };
    fetch("/login", {
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
          this.props.afterSubmit();
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
  handleTest(event) {
    console.log(event.target.value);
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

export default LoginComponent;
