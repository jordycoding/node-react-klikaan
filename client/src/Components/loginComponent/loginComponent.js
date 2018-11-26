import React, { Component } from "react";
import "./loginComponent.css";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePin = this.handlePin.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let data = { email: this.state.email, pin: this.state.pin };
    console.log(JSON.stringify(data));
    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePin(event) {
    this.setState({ pin: event.target.value });
  }
  render() {
    return (
      <div className="login">
        <form className="login" onSubmit={this.handleSubmit}>
          <label>
            Email:{" "}
            <input
              type="text"
              name="email"
              id="email"
              onChange={this.handleEmail}
            />
          </label>
          <label>
            Pin{" "}
            <input
              type="password"
              name="pin"
              id="email"
              onChange={this.handlePin}
            />
          </label>
          <button>Log in!</button>
        </form>
      </div>
    );
  }
}

export default LoginComponent;
