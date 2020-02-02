import React from 'react';
import api from "../../config";
import TournamentCard from "../../components/cards/tournamentCard";
import Grid from "@material-ui/core/Grid";
import AppContext from "../../context/appContext";
import {InputLabel, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class HomeComponent extends React.Component {

    static contextType = AppContext;

    gameTypes = ['All', 'League Of Legends', 'Hearthstone', 'Counter-Strike Global Offensive', 'Dota 2', 'Overwatch', 'Rocket League', 'Fifa 20', 'Other'];

    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            selectedFilter: 0,
        }
    }

    componentDidMount() {
        this.loadData(this.state.selectedFilter);
    }

    loadData = (filter) => {
        api.get(`/user/tournaments?gameType=${filter}`).then(({data}) => {
            this.setState(prevState => ({
                ...prevState,
                tournaments: data,
            }))
        })
    };

    onJoin = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            this.context.snack.setSnack('error', 'Please create account first');
            return;
        }

        api.post(`/user/join/${id}`, {}).then(() => {
            this.context.snack.setSnack('success', 'You have join this tournament');
            this.loadData(this.state.selectedFilter);
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'You cant join this tournament');
            })
    };

    handleFilterChange = (e) => {
        this.setState({selectedFilter: parseInt(e.target.value, 10)});
        this.loadData(e.target.value);
    };

    render() {
        return (
            <>
                <FormControl style={{width: '30vw', margin: '30px auto', display: 'flex'}}>
                    <InputLabel id='gameType'>Game</InputLabel>
                    <Select labelId='gameType' value={this.state.selectedFilter} onChange={this.handleFilterChange}>
                        {this.gameTypes.map((i, index) => (
                            <MenuItem key={index} value={index}>{i}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container justify="center" spacing={10}>
                    {this.state.tournaments.length ?
                        this.state.tournaments.map((i, index) => {
                            return (
                                <Grid key={index} item>
                                    <TournamentCard data={i} onJoin={this.onJoin}/>
                                </Grid>
                            )
                        }) : null
                    }
                </Grid>
            </>
        )
    }
}

export default HomeComponent;
