import React, {useState } from "react"
import {AppBar, Dialog, Toolbar, Typography, IconButton, Slide, Button} from "@material-ui/core"
import {Close} from "@material-ui/icons";
import "./addSequenceDialog/addSequenceDialog.css"

function Transition(props){
    return (
     <Slide direction="up" {...props} />
    )
}

function AddSequenceDialog(props){
    return (
        <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={props.handleClose}>
                        <Close />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        classes={{ root: "titleText" }}
                    >
                        Nieuwe scene
                    </Typography>
                    <Button color="inherit">
                        Opslaan
                    </Button>
                </Toolbar>
            </AppBar>
        </Dialog>
    )
}

export default AddSequenceDialog