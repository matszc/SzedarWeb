import React from 'react';
import FacebookLogin from 'react-facebook-login';

const MyFacebookLogin = ({onClick}) => {
    const responseFacebook = (r) => {
        console.log(r);
    };
    return (
        <FacebookLogin
            appId="2565738756798832"
            autoLoad={false}
            fields="name,email,picture"
            onClick={onClick}
            callback={responseFacebook}/>
    )
};

export default MyFacebookLogin;