import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from "../../../config";
import CustomSnackbar from "../../snacks/snack";

const RegisterDialog = ({children, color, variant}) => {
    const [open, setOpen] = React.useState(false);
    const [snack, setSnack] = React.useState({open: false});
    const [loading, setLoad] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setLoading = () => setLoad(true);

    const cancelLoading = () => setLoad(false);

    const showSnack = (obj) => {
        setSnack(obj);
    };
    const hideSnack = () => {
        setSnack({open: false});
    };

    const submitForm = (e) => {
        e.preventDefault();
        setLoading();
        const payload = {
            Email: e.target[1].value,
            Login: e.target[0].value,
            Password: e.target[2].value,
        };
        api.post('/user/register', payload).then(r => {
            console.log(r);
            showSnack({message: 'User created', variant: 'success', open: true, onClose: hideSnack});
            handleClose();
            cancelLoading();
        })
            .catch(r => {
                showSnack({
                    message: r.response ? r.response.data : 'Server seems to be down',
                    variant: 'error',
                    open: true,
                    onClose: hideSnack
                });
                cancelLoading();
            });
    };

    return (
        <div>
            <Button variant={variant} color={color} onClick={handleClickOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <form onSubmit={submitForm}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Login"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                        <DialogContentText>
                            Already have an account ? Login
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" disabled={loading}>
                            Register
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

export default RegisterDialog;
