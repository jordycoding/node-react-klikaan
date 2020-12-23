import React, {useState} from "react";
import AppToolbar from "../components/AppToolbar";
import RoomsComponent from "./Rooms";
import {Tabs, Tab} from "@material-ui/core";
import SequencesComponent from "./Sequences";
import CssBaseline from "@material-ui/core/CssBaseline"
import {useTranslation} from "react-i18next";

function HomeComponent(props) {
    const [value, setValue] = useState(0);
    const {t, i18n} = useTranslation();
    const handleChange = (event, value) => {
        setValue(value);
    };
    const AppTabs = (
        <Tabs value={value} onChange={handleChange}>
            <Tab label={t("Rooms")}/>
            <Tab label={t("Sequences")}/>
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
