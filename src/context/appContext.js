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
});

export default AppContext;
