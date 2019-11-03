import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider , createMuiTheme} from "@material-ui/core";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        secondary: deepPurple,
        type: "dark"
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
