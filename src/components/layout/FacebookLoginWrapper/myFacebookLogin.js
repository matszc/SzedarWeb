import React from 'react';
import FacebookLogin from 'react-facebook-login';
import api from '../../../config';
import PropTypes from 'prop-types';

const MyFacebookLogin = ({onClick, showSnack, hideSnack, handleUserChange}) => {
    const responseFacebook = (r) => {
        console.log(r);
        const fbUser = {
            Login: r.name,
            Email: r.email,
            FbId: r.id,
        };
        api.post('/user/loginFb', fbUser)
            .then(r => {
                localStorage.setItem('user', JSON.stringify(r.data));
                handleUserChange();
            })
            .catch(r => showSnack({message: 'User login success', variant: 'success', open: true, onClose: hideSnack}));
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
    showSnack: PropTypes.func.isRequired,
    hideSnack: PropTypes.func.isRequired,
    handleUserChange: PropTypes.func.isRequired,

};

export default MyFacebookLogin;