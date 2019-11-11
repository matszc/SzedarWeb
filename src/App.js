import React from 'react';
import './App.css';
import ResponsiveDrawer from "./components/layout/ResponsiveDrawer";
import AppContext from "./context/appContext";
import LoadingSwitcher from "./components/layout/spiner/loadingSwitcher";

class App extends React.Component {

    setLoading = loading => {
        this.setState({ loading });
    };

    state = {
        loading: false,
        setLoading: this.setLoading,
    };

    render() {
        return (
            <>
                <AppContext.Provider value={this.state}>
                    <ResponsiveDrawer/>
{/*                    <LoadingSwitcher/>*/}
                </AppContext.Provider>
            </>
        );
    }
}

export default App;
