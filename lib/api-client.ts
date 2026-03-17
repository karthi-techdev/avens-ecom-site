import axios from 'axios';
import URLs from './urls';

const apiClient = axios.create({
    baseURL: `${URLs.LIVEURL}api/v1`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
