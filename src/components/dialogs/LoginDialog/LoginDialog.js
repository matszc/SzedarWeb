import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import api from '../../../config'
import MyFacebookLogin from "../../layout/FacebookLoginWrapper/myFacebookLogin";
import AppContext from "../../../context/appContext";

const LoginDialog = ({children, color, variant, handleUserChange}) => {
    const [open, setOpen] = React.useState(false);

    const context = React.useContext(AppContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitForm = (e) => {
        e.preventDefault();
        const loginData = {
            Login: e.target[0].value,
            Password: e.target[1].value,
        };
        api.post('/user/login', loginData).then(r => {
            localStorage.setItem('user', JSON.stringify(r.data));
            context.snack.setSnack('success', 'User login success');
            handleUserChange();
        }).catch(r => {
            console.log(r);
            context.snack.setSnack('error', r.response ? r.response.data : 'Server seems to be down');
        });
    };

    return (
        <div>
            <Button variant={variant} color={color} onClick={handleClickOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <MyFacebookLogin
                    handleUserChange={handleUserChange}
                />
                <form onSubmit={submitForm}>
                    <DialogContent>
                        <FormGroup>
                            <FormControl>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Login / Email"
                                    type="text"
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                            </FormControl>
                        </FormGroup>
                        <DialogContentText>
                            Don't have an account ? Create now
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" disabled={context.loader.loading}>
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default LoginDialog;
