import React from 'react';
import './App.css';
import ResponsiveDrawer from "./components/layout/ResponsiveDrawer";
import AppContext from "./context/appContext";
import LoadingSwitcher from "./components/layout/spiner/loadingSwitcher";
import HomeComponent from "./views/Home/Home";
import BrowseTournamentsComponent from "./views/BrowseTournaments/BrowseTournaments";
import CreateTournamentComponent from "./views/CreateTournament/CreateTournament";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CustomSnackbar from "./components/snacks/snack";
import {Swiss} from "./views/Swiss/Swiss";
import {SingleElimination} from "./views/SingleElimination/SingleElimination";
import {DoubleElimination} from "./views/DoubleElimination/DoubleElimination";
import Ranking from "./views/Ranking/Ranking";
import Profile from "./views/Profile/Profile";
import {OpenTournamentDetails} from "./views/OpenDetails/OpenTournamentDetails";

class App extends React.Component {

    setLoading = loading => {
        this.setState({
            ...this.state,
            loader: {
                ...this.state.loader,
                loading: loading,
            }
        });
    };

    setSnack = (variant, message) => {
        this.setState({
            ...this.state,
            snack: {
                ...this.state.snack,
                variant: variant,
                message: message,
                open: true,
            }
        });
    };

    hideSnack = () => {
        this.setState({
            ...this.state,
            snack: {
                ...this.state.snack,
                open: false,
            }
        })
    };

    state = {
        loader: {
            loading: false,
            setLoading: this.setLoading,
        },
        snack: {
            message: '',
            variant: '',
            open: false,
            setSnack: this.setSnack,
        },
    };

    render() {
        return (
            <>
                <BrowserRouter>
                    <AppContext.Provider value={this.state}>
                        <ResponsiveDrawer>
                            <Switch>
                                <Route exact path='/' component={HomeComponent}/>
                                <Route exact path='/browse' component={BrowseTournamentsComponent}/>
                                <Route path='/create' component={CreateTournamentComponent}/>
                                <Route path='/browse/swiss/:id' component={Swiss}/>
                                <Route path='/browse/single/:id' component={SingleElimination}/>
                                <Route path='/browse/double/:id' component={DoubleElimination}/>
                                <Route path={'/ranking/:id'} component={Ranking}/>
                                <Route path={'/profile/:id'} component={Profile}/>
                                <Route path={'/browse/tournament/:id'} component={OpenTournamentDetails}/>
                            </Switch>
                        </ResponsiveDrawer>
                        <CustomSnackbar variant={this.state.snack.variant}
                                        open={this.state.snack.open}
                                        message={this.state.snack.message}
                                        onClose={this.hideSnack}/>
                        <LoadingSwitcher/>
                    </AppContext.Provider>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
