import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Logout = ({children, handleUserChange, color, variant}) => {
    const handleLogout = () => {
        localStorage.removeItem('user');
        handleUserChange();
    };
    return (
        <>
            <Typography variant={"h6"}>Hello, {children}</Typography>
            <Button color={color} variant={variant} onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
};


export default Logout;