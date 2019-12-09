import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://localhost:5001/api',
    headers:{
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    document.querySelector('.Superhidenbuttom').click();
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user ? user.token : ''}`,
    };
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
