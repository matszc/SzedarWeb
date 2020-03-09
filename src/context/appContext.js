import React from "react";

const AppContext = React.createContext({
    loader: {
        loading: false,
        setLoading: () => {
        }
    },
    snack: {
        message: '',
        variant: '',
        open: false,
        setSnack: () => {
        }
    },
    lobby: {
        picks: 0,
        bans: 0,
        setLobby: () => {

        }
    }
});

export default AppContext;
