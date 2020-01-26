import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const Logout = ({children, handleUserChange, color, variant}) => {

    const handleLogout = () => {
        localStorage.removeItem('user');
        handleUserChange();
    };
    return (
        <>
            <Typography variant={"h6"}>Hello, {children}</Typography>
            <Link to='/' style={{textDecoration: 'none', marginLeft: '10px'}}>
                <Button color={color} variant={variant} onClick={handleLogout}>
                    Logout
                </Button>
            </Link>
        </>
    )
};


export default Logout;
