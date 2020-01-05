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
    user: {
        id: '',
        login: '',
        setUser: () => {
        }
    }
});

export default AppContext;
