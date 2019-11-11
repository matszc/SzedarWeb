import React from 'react';
import './App.css';
import ResponsiveDrawer from "./components/layout/ResponsiveDrawer";
import AppContext from "./context/appContext";
import LoadingSwitcher from "./components/layout/spiner/loadingSwitcher";
import HomeComponent from "./views/Home/Home";
import BrowseTournamentsComponent from "./views/BrowseTournaments/BrowseTournaments";
import CreateTournamentComponent from "./views/CreateTournament/CreateTournament";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends React.Component {

    setLoading = loading => {
        this.setState({loading});
    };

    state = {
        loading: false,
        setLoading: this.setLoading,
    };

    render() {
        return (
            <>
                <BrowserRouter>
                    <AppContext.Provider value={this.state}>
                        <ResponsiveDrawer>
                            <Switch>
                                <Route exact path='/' component={HomeComponent}/>
                                <Route path='/browse' component={BrowseTournamentsComponent}/>
                                <Route path='/create' component={CreateTournamentComponent}/>
                            </Switch>
                        </ResponsiveDrawer>
                        <LoadingSwitcher/>
                    </AppContext.Provider>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
