import React, {useState} from "react";
import AppToolbar from "../components/AppToolbar";
import RoomsComponent from "./Rooms";
import {Tabs, Tab} from "@material-ui/core";
import SequencesComponent from "./Sequences";
import CssBaseline from "@material-ui/core/CssBaseline"

function HomeComponent(props) {
    const [value, setValue] = useState(0);
    const handleChange = (event, value) => {
        setValue(value);
    };
    const AppTabs = (
        <Tabs value={value} onChange={handleChange}>
            <Tab label="Ruimtes"/>
            <Tab label="Scenes"/>
        </Tabs>
    );
    return (
        <>
            <CssBaseline/>
            <AppToolbar children={AppTabs}/>
            {
                <>
                    <RoomsComponent hidden={value === 1}/>
                    <SequencesComponent hidden={value === 0}/>
                </>
            }
        </>
    );
}

export default HomeComponent;
