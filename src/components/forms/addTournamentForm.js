import React from "react";
import {Checkbox, FormGroup, InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import AppContext from "../../context/appContext";


export const gameTypes = ['League Of Legends', 'Hearthstone', 'Counter-Strike Global Offensive', 'Dota 2', 'Overwatch', 'Rocket League', 'Fifa 20', 'Other'];

export class AddTournamentForm extends React.Component {

    static contextType = AppContext;

    types = ['DoubleElimination', 'SingleElimination', 'Swiss'];

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            name: '',
            type: '',
            players: ['', '', '', ''],
            swissRounds: 1,
            city: '',
            address: '',
            maxPlayers: '',
            gameType: '',
            selectedDate: new Date(),
        };

        this.addPlayer = this.addPlayer.bind(this);
        this.addPlayerByEnter = this.addPlayerByEnter.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.createTournament = this.createTournament.bind(this);
        this.handleSwissRoundsChange = this.handleSwissRoundsChange.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleGameChange = this.handleGameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    createTournament() {
        if (this.state.open) {
            const tournament = {
                Name: this.state.name,
                Type: this.types.findIndex((i) => i === this.state.type),
                Players: this.state.players,
                Rounds: this.state.swissRounds,
                MaxNumberOfPlayers: parseInt(this.state.maxPlayers, 10),
                GameType: this.state.gameType,
                City: this.state.city,
                Address: this.state.address,
                StartDate: this.state.selectedDate,
            };
            this.props.onSubmit(tournament, this.state.open);
        } else {
            const tournament = {
                Name: this.state.name,
                Type: this.types.findIndex((i) => i === this.state.type),
                Players: this.state.players,
                Rounds: this.state.swissRounds,
            };
            this.props.onSubmit(tournament, this.state.open);
        }
    }

    addPlayer(e) {
        e.preventDefault();
        this.setState(prevState => (
            {
                ...prevState,
                players: [...prevState.players, '']
            }
        ))
    }

    addPlayerByEnter(e) {
        if (e.key !== 'Enter')
            return;
        this.setState(prevState => (
            {
                ...prevState,
                players: [...prevState.players, '']
            }
        ))
    }

    handlePlayerChange(e, index) {
        const playerList = [...this.state.players];
        playerList[index] = e.target.value;
        this.setState({players: playerList});
    }

    handleTypeChange(e) {
        this.setState({type: e.target.value})
    }

    handleSwissRoundsChange(e) {
        /*        this.setState(prevState => ({
                    ...prevState,
                    swissRounds: parseInt(e.target.value, 10),
                }));*/
        this.setState({swissRounds: parseInt(e.target.value, 10),})
    }

    handleOpenChange() {
        this.setState(prevState => ({
            ...prevState,
            open: !prevState.open,
            swissRounds: 1,
        }))
    }

    handleInputChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    handleGameChange(e) {
        this.setState({gameType: parseInt(e.target.value, 10)})
    }

    handleDateChange(date) {
        this.setState({selectedDate: date});
    }

    render() {
        return (
            <>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.open} color={'primary'}
                                           onChange={this.handleOpenChange}/>}
                        label={"Allow other players join tournament"}
                    />
                    <FormControl required
                                 margin={'dense'}
                    >
                        <InputLabel htmlFor='name'>Name</InputLabel>
                        <Input id='name' value={this.state.name} onChange={this.handleInputChange}/>
                    </FormControl>
                    <FormControl required
                                 margin={'normal'}
                    >
                        <InputLabel id='type'>Type</InputLabel>
                        <Select labelId='type' value={this.state.type} onChange={this.handleTypeChange}>
                            {this.types.map((i, index) => (
                                <MenuItem key={index} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {!this.state.type.length ? null :
                        this.state.players.map((item, index) => (
                            <FormControl key={index}
                                         margin={'dense'}>
                                <InputLabel htmlFor={index.toString()}>Player {index + 1}</InputLabel>
                                <Input value={this.state.players[index]}
                                       onChange={(e) => this.handlePlayerChange(e, index)}
                                       id={index.toString()} onKeyUp={(e) => this.addPlayerByEnter(e)}/>
                            </FormControl>
                        ))}
                    {!this.state.type.length ? null : (
                        <Link href='#' className={'margin_10_0'} onClick={this.addPlayer}>Add player</Link>
                    )}

                    {!(this.state.type === 'Swiss' && !this.state.open) ? null : (
                        <FormControl>
                            <InputLabel id='rounds'>Number of rounds</InputLabel>
                            <Select labelId='rounds' value={this.state.swissRounds}
                                    onChange={this.handleSwissRoundsChange}>
                                {this.state.players.filter(i => i !== '').length > 1 ? this.state.players.filter((i, index) => i !== '' && index !== 0)
                                    .map((i, index) => (
                                        <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                                    )) : <MenuItem value={1}>1</MenuItem>}
                            </Select>
                        </FormControl>
                    )}
                    {!(this.state.type === 'Swiss' && this.state.open) ? null : (
                        <FormControl required
                                     margin={'dense'}
                        >
                            <InputLabel htmlFor='Rounds'>Number of rounds</InputLabel>
                            <Input type={'number'} id='swissRounds' value={this.state.swissRounds}
                                   onChange={this.handleSwissRoundsChange}/>
                        </FormControl>
                    )}
                    {this.state.open ?
                        <>
                            <FormControl required
                                         margin={'dense'}
                            >
                                <InputLabel htmlFor='maxPlayers'>Maximum number of players</InputLabel>
                                <Input type={'number'} id='maxPlayers' value={this.state.maxPlayers}
                                       onChange={this.handleInputChange}/>
                            </FormControl>
                            <FormControl required
                                         margin={'dense'}
                            >
                                <InputLabel htmlFor='city'>City</InputLabel>
                                <Input id='city' value={this.state.city} onChange={this.handleInputChange}/>
                            </FormControl>
                            <FormControl required
                                         margin={'dense'}
                            >
                                <InputLabel htmlFor='address'>Address</InputLabel>
                                <Input id='address' value={this.state.address} onChange={this.handleInputChange}/>
                            </FormControl>
                            <FormControl required
                                         margin={'normal'}
                            >
                                <InputLabel id='gameType'>Game</InputLabel>
                                <Select labelId='gameType' value={this.state.gameType} onChange={this.handleGameChange}>
                                    {gameTypes.map((i, index) => (
                                        <MenuItem key={index} value={index + 1}>{i}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Select start day"
                                        format="MM/dd/yyyy"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Select hour"
                                        value={this.state.selectedDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                        </>
                        : null}

                    <Button variant="contained" color="primary" className={'margin_10'}
                            onClick={this.createTournament}>Create</Button>
                </FormGroup>
            </>
        )
    }
}
