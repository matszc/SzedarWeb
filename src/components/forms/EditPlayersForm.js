import React from "react";
import {ListItemSecondaryAction, Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditPlayersForm = ({players, onEdit, onAdd, onDelete}) => {

    const [newPlayers, setPlayers] = React.useState([]);

    const [playerList, setPlayersList] = React.useState(players);


    const onPlayerChange = (e, pIndex) => {
        const playerList = [...newPlayers];
        playerList[pIndex] = e.target.value;
        setPlayers(playerList);
    };

    const addPlayer = () => {
        setPlayers((prevState => ([
            ...prevState, '',
        ])))
    };

    const addInput = (e) => {
        if (e.key !== 'Enter') return;

        addPlayer();
    };

    const enableEdit = (index) => {

        const list = [...playerList];
        list[index] = {
            ...list[index],
            editing: true,
        };

        setPlayersList(list);
    };

    const editPlayerChange = (e, index) => {
        const list = [...playerList];
        list[index] = {
            ...playerList[index],
            nick: e.target.value,
        };
        setPlayersList(list);
    };

    const submitEditPlayer = (player) => {

        onEdit(player).then(() => {
            setPlayersList(prevState => {
                return prevState.map(i => {
                    //i.id === player.id? delete i.editing: null;
                    if (i.id === player.id) delete i.editing;

                    return i;
                })
            })
        }).catch(() => {
            setPlayersList(prevState => {
                return prevState.map((i, index) => {
                    return i.id === player.id ? {
                        ...players[index]
                    } : i
                })
            })
        })
    };


    const submitNewPlayers = () => {
        onAdd(newPlayers).then(() => {
            setPlayers([]);
        })
    };

    const deleteAction = (player) => {
        onDelete(player).then(() => {
            setPlayersList((prevState => {
                return prevState.filter(i => i.id !== player.id)
            }))
        })

    };

    return (
        <>
            <Typography variant={'h6'}>
                Players
            </Typography><List>
            {playerList.map((i, index) => (
                <ListItem key={i.id}>
                    {!i.editing ?
                        <>
                            <ListItemText primary={i.nick}/>
                            <ListItemSecondaryAction>
                                {i.userId === null ?
                                    <IconButton edge={'end'} aria-label={'edit'} onClick={() => enableEdit(index)}>
                                        <EditIcon/>
                                    </IconButton> : null
                                }

                                <IconButton edge={'end'} aria-label={'delete'} onClick={() => deleteAction(i)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </> :
                        <FormControl margin={'dense'}>
                            <InputLabel htmlFor={i.nick}>Player {index + 1}
                            </InputLabel>
                            <Input value={i.nick}
                                   onChange={(e) => editPlayerChange(e, index)}
                                   id={i.nick}
                                   onBlur={() => submitEditPlayer(i)}
                                   onKeyUp={(e) => {
                                       if (e.key !== 'Enter') return;
                                       submitEditPlayer(i)
                                   }}
                            />
                        </FormControl>
                    }
                </ListItem>
            ))}
        </List>
            <FormGroup>
                {newPlayers.map((i, index) => (
                    <FormControl key={index} margin={'dense'}>
                        <InputLabel htmlFor={index.toString()}>Player {index + 1}
                        </InputLabel>
                        <Input value={newPlayers[index]}
                               onChange={(e) => onPlayerChange(e, index)}
                               id={index.toString()}
                               onKeyUp={(e) => {
                                   addInput(e);
                               }}
                        />
                    </FormControl>
                ))}
            </FormGroup>
            <Button variant={'contained'} onClick={() => addPlayer()} color={'primary'}>
                Add
            </Button>
            {newPlayers.length > 0 ?
                <Button onClick={() => submitNewPlayers()} color={'secondary'} variant={'contained'}>
                    Save
                </Button>
                : null
            }
        </>
    )
};

EditPlayersForm.defaultProps = {
    players: []
};

EditPlayersForm.propTypes = {
    players: PropTypes.array,
    onEdit: PropTypes.func,
};


export default EditPlayersForm;