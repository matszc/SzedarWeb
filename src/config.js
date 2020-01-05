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

export const tournamentTypes = (type) => {
    switch (type) {
        case 0: {
            type = 'DoubleElimination';
            break;
        }
        case 1: {
            type = 'SingleElimination';
            break;
        }
        case 2: {
            type = 'Swiss';
            break;
        }
        case 'DoubleElimination': {
            type = 0;
            break;
        }
        case 'SingleElimination': {
            type = 1;
            break;
        }
        case 'Swiss': {
            type = 2;
            break;
        }
        default: {
        }
    }
    return type;
};


export default api;
