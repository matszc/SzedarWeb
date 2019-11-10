import React from "react";
import {Snackbar} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";
import {amber, green} from "@material-ui/core/colors";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Icon from "@material-ui/core/Icon";

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[400],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[600],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
    },
}));

const CustomSnackContent = ({className, message, onClose, variant, ...props}) => {
    const classes = useStyles1();
    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...props}
        />)
};

/*CustomSnackContent.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};*/

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const CustomSnackbar = ({open, variant, message, onClose, ...props}) => {
    const {close, setClose} = React.useState(open);
    const classes = makeStyles(useStyles2);
    const handleClose = () => {
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <CustomSnackContent
                className={classes.margin}
                onClose={onClose}
                variant={variant}
                message={message}
            />
        </Snackbar>
    );
};

export default CustomSnackbar;