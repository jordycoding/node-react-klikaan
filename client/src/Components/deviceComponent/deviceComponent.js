import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class DeviceComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Typography component="p">{this.props.device.name}</Typography>;
  }
}

export default DeviceComponent;
