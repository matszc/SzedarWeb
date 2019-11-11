import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import LoginDialog from "../dialogs/LoginDialog/LoginDialog";
import RegisterDialog from "../dialogs/RegisterDialog/RegisterDialog";
import Logout from "./Logout";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1
    },
}));

export const NavBar = ({handleDrawerToggle, children}) => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

    const handleUserChange = () => {
        setUser(JSON.parse(localStorage.getItem('user')));
    };
    const classes = useStyles();
    return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        {children}
                    </Typography>
                    {user ? <Logout variant='outlined' handleUserChange={handleUserChange}>{user.login}</Logout>
                        : (<LoginDialog handleUserChange={handleUserChange} variant='contained'>Login</LoginDialog>)}
                    {user ? null : (<RegisterDialog variant='outlined' handleUserChange={handleUserChange}>Register</RegisterDialog>)}

                </Toolbar>
            </AppBar>
    )
};