import React, {Component} from "react";
import LoginComponent from "./pages/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {settingsOperations} from "./modules/settings";
import {roomsOperations} from "./modules/rooms";
import HomeComponent from "./pages/HomeComponent";
import {lightBlue, indigo, teal, green, pink} from "@material-ui/core/colors";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {useSelector, useDispatch} from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {CssBaseline} from "@material-ui/core";
import "./i18n"

function App(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        light: '#6ec6ff',
                        dark: '#0069c0',
                        main: '#2196f3',
                        contrastText: '#000000'
                    },
                    secondary: {
                        light: '#ffe97d',
                        dark: '#c88719',
                        main: '#ffb74d',
                        contrastText: '#000000'
                    },
                    on: {
                        main: "#00ff00",
                        light: "#ff0000",
                        dark: "#0000ff"
                    }
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
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="loading">
                    <CircularProgress/>
                </div>
            </MuiThemeProvider>
        );
    } else if (
        selector.settingsFileExists === false &&
        selector.settingsLoading === false
    ) {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <LoginComponent/>
            </MuiThemeProvider>
        );
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
