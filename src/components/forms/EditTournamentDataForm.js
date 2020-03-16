import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import moment from "moment";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const EditTournamentDataForm = ({data, submitFunc}) => {

    const [tournament, setTournament] = React.useState(data);

    const [editProp, setEditProp] = React.useState('');

    const updateState = (e, prop) => {
        console.log(e);

        const v = prop === 'startDate' ? e : e.target.value;
        setTournament(prevState => ({
            ...prevState,
            [prop]: v, //TODO fix date is -2h
        }));
    };

    const submit = () => {
        submitFunc(tournament).then(() => {
            setEditProp('');
        })
            .catch(() => {
                setTournament(data);
                setEditProp('');
            })
    };

    return (
        <List>
            {Object.keys(tournament).filter(i => i !== 'id' && i !== 'players')
                .map(i => {
                    const displayProp = i[0].toUpperCase() + i.slice(1);
                    return (
                        <ListItem key={i}>
                            {editProp !== i ?
                                <>
                                    <ListItemText primary={displayProp + ' :  '}/>
                                    <ListItemText
                                        secondary={i !== 'startDate' ? tournament[i] : moment(tournament[i]).format('DD-MM-YYYY HH:mm')}/>
                                    <IconButton onClick={() => setEditProp(i)}>
                                        <EditIcon/>
                                    </IconButton>
                                </> : i === 'startDate' ?
                                    <FormControl>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Select start day"
                                                    format="MM/dd/yyyy"
                                                    value={tournament[i]}
                                                    onChange={(date) => updateState(date, i)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Select hour"
                                                    value={tournament[i]}
                                                    onChange={(date) => updateState(date, i)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                                <Button variant={'contained'} onClick={submit} color={'primary'}>
                                                    Save date
                                                </Button>
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                    :
                                    <FormControl margin={'dense'}>
                                        <InputLabel htmlFor={i}>New value
                                        </InputLabel>
                                        <Input value={tournament[i]}
                                               onChange={(e) => updateState(e, i)}
                                               id={i}
                                               onBlur={() => submit(i)}
                                               onKeyUp={(e) => {
                                                   if (e.key !== 'Enter') return;
                                                   submit(i)
                                               }}
                                        />
                                    </FormControl>
                            }
                        </ListItem>
                    )
                })}
        </List>
    )
};


export default EditTournamentDataForm;