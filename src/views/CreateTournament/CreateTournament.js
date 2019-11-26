import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, CardHeader, Container, FormGroup, InputLabel, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import api from "../../config";

class CreateTournamentComponent extends React.Component {
    types = ['Single elimination', 'Double elimination', 'Swiss'];

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            players: ['', '', '', ''],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.addPlayerByEnter = this.addPlayerByEnter.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.submitTournament = this.submitTournament.bind(this);
    }

    submitTournament() {
        const player = {
          Name: this.state.name,
          Type: this.state.type,
          Players: this.state.players,
        };
        player.Players = player.Players.filter(i => i!=='');
        api.post('/tournament/create', player)
            .then(r => console.log(r))
            .catch(r => console.log(r));
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
        this.state.players[index] = e.target.value;
        this.setState({players: this.state.players});
        //this.setState({players[index]: e.target.value})
    }

    handleTypeChange(e) {
        this.setState({type: e.target.value})
    }

    render() {
        return (
            <>
                <Container maxWidth={'md'}>
                    <Card>
                        <CardHeader title='Add new tournament'/>
                        <CardContent>
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
                                <Button variant="contained" color="primary"
                                        onClick={this.submitTournament}>Create</Button>
                            </FormGroup>
                        </CardContent>
                    </Card>
                </Container>
            </>
        )
    }
}

export default CreateTournamentComponent;