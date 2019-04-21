import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
  Slide,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddCommandDialog extends React.Component {
  state = { roomId: "", deviceId: "", command: "" };
  hanldeRoomSelect = event => {
    event.preventDefault();
    console.log(event.target.roomid);
    this.setState({
      ...this.state,
      roomId: event.target.value
    });
  };
  render() {
    const { fullScreen } = this.props;

    return (
      <Dialog
        disableBackdropClick
        fullScreen={fullScreen}
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>{"Add Command"}</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <InputLabel htmlFor="room">Room</InputLabel>
              <Select
                value={this.state.roomId}
                inputProps={{ name: "room", id: "room" }}
                onChange={this.hanldeRoomSelect}
              >
                {this.props.rooms.map(room => {
                  if (room.status === "A") {
                    return <MenuItem value={room.id}>{room.name}</MenuItem>;
                  }
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.rooms.rooms
  };
}
export default connect(mapStateToProps)(withMobileDialog()(AddCommandDialog));
