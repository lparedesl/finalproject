import axios from 'axios';

export const GET_AUTH_DATA = 'get_csrf_token';

export function getCsrfToken() {
    const request = axios.get('/get-csrf-token');

    return {
        type: GET_AUTH_DATA,
        payload: request
    };
}