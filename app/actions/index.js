import axios from 'axios';

export const GET_AUTH_DATA = 'get_auth_data';
export const SIGNIN = 'signin';
export const SIGNUP = 'signup';
export const GET_USER_INFO = 'get_user_info';
export const GET_LOCATIONS = 'get_locations';
export const LOCATION_SELECTED = 'location_selected';
export const FIELD_SELECTED = 'field_selected';
export const RESERVE_FIELD = 'reserve_field';
export const GET_FIELD_RESERVATIONS = 'get_field_reservations';

export function getAuthData(cb) {
    const request = axios.get('/api/get-csrf-token');

    return {
        type: GET_AUTH_DATA,
        payload: request
    };
}

export function signin(values, cb) {
    const request = axios.post('/signin', values)
                         .then(() => cb());

    return {
        type: SIGNIN,
        payload: request
    };
}

export function signup(values, cb) {
    const request = axios.post('/signup', values)
                         .then(() => cb());

    return {
        type: SIGNUP,
        payload: request
    };
}

export function getUserInfo() {
    const request = axios.get('/api/get-user-info');

    return {
        type: GET_USER_INFO,
        payload: request
    };
}

export function getLocations() {
    const request = axios.get('/api/get-locations');

    return {
        type: GET_LOCATIONS,
        payload: request
    };
}

export function selectLocation(location) {
    return {
        type: LOCATION_SELECTED,
        payload: location
    };
}

export function selectField(field) {
    return {
        type: FIELD_SELECTED,
        payload: field
    };
}

export function reserveField(values, cb) {
    const request = axios.post('/api/reserve-field', values)
                         .then((data) => cb(data));

    return {
        type: RESERVE_FIELD,
        payload: request
    };
}

export function getFieldReservations(id) {
    const request = axios.post('/api/field-schedule', {id: id});

    return {
        type: GET_FIELD_RESERVATIONS,
        payload: request
    };
}