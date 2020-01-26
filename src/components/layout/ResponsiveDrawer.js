import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {NavBar} from "./NavBar";
import CircularIndeterminate from './spiner/spiner';
import AppContext from "../../context/appContext";
import {NavLink} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    secondaryColor: {
        background: theme.palette.primary.main
    },
    link: {
        "text-decoration": 'none',
        color: 'white'
    },
    activeLink: {
        color: theme.palette.primary.light
    }
}));

function ResponsiveDrawer(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={[classes.toolbar, classes.secondaryColor].join(' ')}/>
            <Divider/>
            <List>
                <NavLink exact to='/' className={classes.link} activeClassName={classes.activeLink}>
                    <ListItem button key='Home'>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>
                </NavLink>
                <Divider/>
                <NavLink to='/create' className={classes.link} activeClassName={classes.activeLink}>
                    <ListItem button key='Create Tournament'>
                        <ListItemIcon><AddIcon/></ListItemIcon>
                        <ListItemText primary='Create Tournament'/>
                    </ListItem>
                </NavLink>
                <Divider/>
                <NavLink to='/browse' className={classes.link} activeClassName={classes.activeLink}>
                    <ListItem button key='Browse Tournaments'>
                        <ListItemIcon><ListAltIcon/></ListItemIcon>
                        <ListItemText primary='Browse Tournaments'/>
                    </ListItem>
                </NavLink>
            </List>
            <Divider/>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppContext.Consumer>
                {(context) => (
                    context.loader.loading ? <CircularIndeterminate/>
                        : null
                )}
            </AppContext.Consumer>
            <CssBaseline/>
            <NavBar handleDrawerToggle={handleDrawerToggle}>Szedar Tournament</NavBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                The implementation can be swapped with js to avoid SEO duplication of links.
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

export default ResponsiveDrawer;
