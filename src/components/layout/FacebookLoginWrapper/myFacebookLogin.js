import React from 'react';
import FacebookLogin from 'react-facebook-login';
import api from '../../../config';
import PropTypes from 'prop-types';
import AppContext from "../../../context/appContext";

const MyFacebookLogin = ({onClick, handleUserChange}) => {

    const context = React.useContext(AppContext);

    const responseFacebook = (r) => {
        const fbUser = {
            Login: r.name,
            Email: r.email,
            FbId: r.id,
        };
        api.post('/user/loginFb', fbUser)
            .then(r => {
                localStorage.setItem('user', JSON.stringify(r.data));
                context.snack.setSnack('success', 'User login success');
                handleUserChange();
            })
            .catch(() => context.snack.setSnack('error', 'User login error'));
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

MyFacebookLogin.propTypes = {
    onClick: PropTypes.func,
    handleUserChange: PropTypes.func.isRequired,

};

export default MyFacebookLogin;
