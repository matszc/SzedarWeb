import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppContext from "../../context/appContext";
import {Link} from "react-router-dom";

const Logout = ({children, handleUserChange, color, variant}) => {

    const context = React.useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem('user');
        handleUserChange();
        context.user.setUser('', '');
        //TODO redirect to home
    };
    return (
        <>
            <Typography variant={"h6"}>Hello, {children}</Typography>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Button color={color} variant={variant} onClick={handleLogout}>
                    Logout
                </Button>
            </Link>
        </>
    )
};


export default Logout;
