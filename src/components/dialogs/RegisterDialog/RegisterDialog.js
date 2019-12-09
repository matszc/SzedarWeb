import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from "../../../config";
import MyFacebookLogin from "../../layout/FacebookLoginWrapper/myFacebookLogin";
import AppContext from "../../../context/appContext";

const RegisterDialog = ({children, color, variant, handleUserChange}) => {
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
        const payload = {
            Email: e.target[1].value,
            Login: e.target[0].value,
            Password: e.target[2].value,
        };
        api.post('/user/register', payload).then(r => {
            console.log(r);
            context.snack.setSnack('success', 'User created');
            handleClose();
        })
            .catch(r => {
                context.snack.setSnack('error', r.response ? r.response.data : 'Server seems to be down');
            });
    };

    return (
        <div>
            <Button variant={variant} color={color} onClick={handleClickOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <MyFacebookLogin
                    handleUserChange={handleUserChange}
                />
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
                        <Button type='submit' color="primary" disabled={context.loader.loading}>
                            Register
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default RegisterDialog;
