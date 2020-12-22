import React, {Component} from "react";
import LoginComponent from "./pages/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {settingsOperations} from "./modules/settings";
import {roomsOperations} from "./modules/rooms";
import HomeComponent from "./pages/HomeComponent";
import {lightBlue, indigo, teal, green} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {useSelector, useDispatch} from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";



function App(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const selector = useSelector(state => {
        return {
            settingsFileExists: state.settings.settingsExists,
            settingsLoading: state.settings.loading,
            roomsLoading: state.rooms.loading,
            rooms: state.rooms.rooms
        };
    })

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(settingsOperations.checkSettingsExists()).then(() => {
            if (selector.settingsFileExists) {
                dispatch(roomsOperations.getRooms());
            }
        });
        console.log("use effect called")
    }, [settingsOperations, selector.settingsFileExists])
    if (
        selector.settingsLoading === true ||
        selector.roomsLoading === true ||
        (selector.roomsLoading === true && selector.settingsLoading === true)
    ) {
        return (
            <div className="loading">
                <CircularProgress/>
            </div>
        );
    } else if (
        selector.settingsFileExists === false &&
        selector.settingsLoading === false
    ) {
        return <LoginComponent/>;
    } else if (
        selector.roomsLoading === false &&
        selector.settingsFileExists === true
    ) {
        return (
            <MuiThemeProvider theme={theme}>
                <HomeComponent/>
            </MuiThemeProvider>
        );
    } else {
        return <p>Error</p>;
    }

}

export default App;
