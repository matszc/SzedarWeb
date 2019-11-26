import axios from 'axios';
import React from "react";

const user = localStorage.getItem('user');

export const api = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers:{
        Authorization: `Bearer ${user ? user.token : ''}`,
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    document.querySelector('.Superhidenbuttom').click();
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(config => {
    document.querySelector('.Superhidenbuttom').click();
    return config;
}, (error) => {
    document.querySelector('.Superhidenbuttom').click();
    return Promise.reject(error);
});

export default api;