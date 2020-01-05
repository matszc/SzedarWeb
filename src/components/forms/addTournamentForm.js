import React from "react";
import {FormGroup, InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

export class AddTournamentForm extends React.Component {

    types = ['DoubleElimination', 'SingleElimination', 'Swiss'];

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            players: ['', '', '', ''],
            swissRounds: 1,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.addPlayerByEnter = this.addPlayerByEnter.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.createTournament = this.createTournament.bind(this);
        this.handleSwissRoundsChange = this.handleSwissRoundsChange.bind(this);
    }

    createTournament() {
        const tournament = {
            Name: this.state.name,
            Type: this.types.findIndex((i) => i === this.state.type),
            Players: this.state.players,
            Rounds: this.state.swissRounds,
        };
        this.props.onSubmit(tournament);
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

    handleNameChange(e) {
        this.setState({name: e.target.value})
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
        this.setState(prevState => ({
            ...prevState,
            swissRounds: parseInt(e.target.value, 10),
        }));
    }

    render() {
        return (
            <>
                <FormGroup>
                    <FormControl required>
                        <InputLabel htmlFor='name'>Name</InputLabel>
                        <Input id='name' value={this.state.name} onChange={this.handleNameChange}/>
                    </FormControl>
                    <FormControl required>
                        <InputLabel id='type'>Type</InputLabel>
                        <Select labelId='type' value={this.state.type} onChange={this.handleTypeChange}>
                            {this.types.map((i, index) => (
                                <MenuItem key={index} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {!this.state.type.length ? null :
                        this.state.players.map((item, index) => (
                            <FormControl key={index}>
                                <InputLabel htmlFor={index.toString()}>Player {index + 1}</InputLabel>
                                <Input value={this.state.players[index]}
                                       onChange={(e) => this.handlePlayerChange(e, index)}
                                       id={index.toString()} onKeyUp={(e) => this.addPlayerByEnter(e)}/>
                            </FormControl>
                        ))}
                    {!this.state.type.length ? null : (
                        <Link href='#' onClick={this.addPlayer}>Add player</Link>
                    )}

                    {!(this.state.type === 'Swiss') ? null : (
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

                    <Button variant="contained" color="primary"
                            onClick={this.createTournament}>Create</Button>
                </FormGroup>
            </>
        )
    }
}
