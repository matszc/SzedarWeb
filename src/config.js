import axios from 'axios';

const user = localStorage.getItem('user');

export default axios.create({
    baseURL: 'https://localhost:5001/api',
    headers: {
        Authorization: `Bearer ${user ? user.token : ''}`,
        'Content-Type': 'application/json',
    },
});