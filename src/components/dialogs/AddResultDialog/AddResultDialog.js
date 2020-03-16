import React, {useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import AppContext from "../../../context/appContext";
import Button from "@material-ui/core/Button";
import Chat from "../../chat/Chat";

const AddResultDialog = ({open, data, handleClose, handleSubmit}) => {
    const context = useContext(AppContext);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogTitle id={'add result dialog'}> Add result </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin={'dense'}
                        label={data.player1}
                        defaultValue={data.player1Score}
                        className={'margin_10'}
                    />
                    <TextField
                        label={data.player2}
                        defaultValue={data.player2Score}
                        margin={'dense'}
                        className={'margin_10'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type='submit' color="primary" disabled={context.loader.loading}>
                        Save
                    </Button>
                </DialogActions>
            </form>
            <Chat user={user ? user : {login: 'guest'}} id={data.id}/>
        </Dialog>

    );
};


export default AddResultDialog
