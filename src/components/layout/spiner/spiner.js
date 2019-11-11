import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        background: '#404040',
        display: 'flex',
        opacity: '0.3',
        "z-index": '10001',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    spiner: {
        position: 'relative',
        top:'50%',
        left: '50%',
    }
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress size={64} className={classes.spiner}/>
        </div>
    );
}