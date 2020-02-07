import * as React from "react";
import api from "../../config";
import AppContext from "../../context/appContext";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import WrapperCard from "../../components/cards/wrapperCard";
import Grid from "@material-ui/core/Grid";
import TournamentCard from "../../components/cards/tournamentCard";
import SwissRound from "../../components/tables/swissRound";

class Profile extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        this.state = {
            data: undefined,
            playerSearch: '',
        }
    }

    componentDidMount() {
        this.loadData();
    }

    handleSearchChange = (e) => {
        this.setState({playerSearch: e.target.value})
    };

    loadData = () => {
        api.get(`/user/profile?id=${this.props.match.params.id}`).then(({data}) => {
            console.log(data);
            this.setState({data: data});
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'User not found')
            })
    };

    searchPlayer = () => {
        api.get(`/user/profile?nick=${this.state.playerSearch}`).then(({data}) => {
            console.log(data);
            this.setState({data: data});
        })
            .catch(() => {
                this.context.snack.setSnack('error', 'User not found')
            })

    };

    leaveTournament = ({id}) => {
        api.delete(`/user/join/${id}`).then(() => {
            this.loadData();
            this.context.snack.setSnack('success', 'you left this tournament');
        })
            .catch(({data}) => {
                this.context.snack.setSnack('error', data);
            })
    };

    navigateToTournament = ({id, type}) => {
        const tournamentType = (res) => {
            switch (res) {
                case 0: {
                    res = 'double';
                    break;
                }
                case 1: {
                    res = 'single';
                    break;
                }
                case 2: {
                    res = 'swiss';
                    break;
                }
                default: {
                    res = '';
                    break;
                }
            }
            return res;
        };

        this.props.history.push(`/browse/${tournamentType(type)}/${id}`);
    };

    render() {
        return (
            <>
                <FormControl style={{width: '30vw', margin: '30px auto', display: 'flex'}}>
                    <TextField id="outlined-basic" label="Search player" variant="outlined"
                               onChange={this.handleSearchChange}/>
                    <Button style={{marginTop: '9px'}} variant="contained" onClick={this.searchPlayer} color="primary">
                        Search
                    </Button>
                </FormControl>
                {this.state.data ?
                    <>
                        <h1>{this.state.data.nick}</h1>
                        {this.state.data.upComingTournament.length ?
                            <WrapperCard title={'Your Up Coming Events'} maxWidth={'lg'}
                                         style={{maxHeight: '50vh', overflowY: 'scroll', paddingBottom: '50px'}}>
                                <Grid container justify="space-around" spacing={5}>
                                    {this.state.data.upComingTournament.map(i => (
                                        <Grid key={i.id}>
                                            <TournamentCard data={i} maxWidth={200} actionText={'Leave tournament'}
                                                            hidePlayers onAction={this.leaveTournament}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </WrapperCard> : null}
                        {this.state.data.pastTournaments.length ? <WrapperCard title={'Past events'} maxWidth={'lg'}
                                                                               style={{
                                                                                   maxHeight: '65vh',
                                                                                   overflowY: 'scroll',
                                                                                   paddingBottom: '50px'
                                                                               }}>
                            <Grid container justify="space-around" spacing={10}>
                                {this.state.data.pastTournaments.map(i => (
                                    <Grid key={i.id}>
                                        <TournamentCard data={i} maxWidth={200} maxHeigth={300}
                                                        actionText={'Show tournament'} hidePlayers
                                                        onAction={this.navigateToTournament}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </WrapperCard> : null}
                        {this.state.data.pastMatches.length ?
                            <WrapperCard title={'Past matches'} maxWidth={'lg'}>
                                <SwissRound data={this.state.data.pastMatches}/>
                            </WrapperCard>
                            : null}
                    </>
                    : null}
            </>
        )
    }
}

export default Profile;
