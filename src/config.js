import axios from 'axios';


export const baseUrl = 'https://localhost:5001';

export const api = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
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
    console.error(error);
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

export const gameTypes = (type) => {
    switch (type) {
        case 0: {
            type = '';
            break;
        }
        case 1: {
            type = 'LeagueOfLegends';
            break;
        }
        case 2: {
            type = 'Hearthstone';
            break;
        }
        case 3: {
            type = 'Counter-Strike Global Offensive';
            break;
        }
        case 4: {
            type = 'Dota 2';
            break;
        }
        case 5: {
            type = 'Overwatch';
            break;
        }
        case 6: {
            type = 'Rocket League';
            break;
        }
        case 7: {
            type = 'Fifa';
            break;
        }
        case 8: {
            type = 'Other';
            break;
        }
        default: {
            type = '';
        }
    }
    return type;
};


export default api;
