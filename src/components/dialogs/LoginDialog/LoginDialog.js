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
import CustomSnackbar from "../../snacks/snack";
import MyFacebookLogin from "../../layout/FacebookLoginWrapper/myFacebookLogin";

const LoginDialog = ({children, color, variant, handleUserChange}) => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoad] = React.useState(false);
    const [snack, setSnack] = React.useState({open: false});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showSnack = (obj) => {
        setSnack(obj);
    };
    const hideSnack = () => {
        setSnack({open: false});
    };
    const setLoading = () => setLoad(true);

    const cancelLoading = () => setLoad(false);

    const submitForm = (e) => {
        e.preventDefault();
        setLoading();
        const loginData = {
            Login: e.target[0].value,
            Password: e.target[1].value,
        };
        api.post('/user/login', loginData).then(r => {
            cancelLoading();
            localStorage.setItem('user', JSON.stringify(r.data));
            showSnack({message: 'User login success', variant: 'success', open: true, onClose: hideSnack});
            handleUserChange();
        }).catch(r => {
            console.log(r);
            cancelLoading();
            showSnack({
                message: r.response ? r.response.data : 'Server seems to be down',
                variant: 'error',
                open: true,
                onClose: hideSnack
            });
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
                    showSnack={showSnack}
                    hideSnack={hideSnack}
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
                        <Button type='submit' color="primary" disabled={loading}>
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <CustomSnackbar
                {...snack}
            />
        </div>
    );
};

export default LoginDialog;
