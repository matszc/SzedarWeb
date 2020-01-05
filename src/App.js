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

    setUser = (id, login) => {
        this.setState({
            ...this.state,
            user: {
                id: id,
                login: login,
            }
        })
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
        user: {
            id: '',
            login: '',
            setUser: this.setUser,
        }
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
