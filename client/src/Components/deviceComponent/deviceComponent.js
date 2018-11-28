import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class DeviceComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.device.status === "O") {
      return (
        <>
          <Typography component="p">{this.props.device.name}</Typography>
          <Button color="primary" variant="contained" />
        </>
      );
    }
  }
}

export default DeviceComponent;
