import axios from 'axios';

export const GET_AUTH_DATA = 'get_auth_data';
export const SIGNIN = 'signin';
export const SIGNUP = 'signup';
export const GET_USER_INFO = 'get_user_info';
export const GET_LOCATIONS = 'get_locations';
export const GET_FAVORITE_LOCATIONS = 'get_favorite_locations';
export const GET_USER_RESERVATIONS = 'get_user_reservations';
export const TAB_SELECTED = 'tab_selected';
export const LOCATION_SELECTED = 'location_selected';
export const FAVORITE_LOCATION_SELECTED = 'favorite_location_selected';
export const FIELD_SELECTED = 'field_selected';
export const RESERVE_FIELD = 'reserve_field';
export const GET_FIELD_RESERVATIONS = 'get_field_reservations';
export const GET_TEAMS = 'get_teams';
export const TEAM_SELECTED = 'team_selected';
export const FAVORITE_LOCATION = 'favorite_location';
export const RESET_ACTIVE_ITEMS = 'reset_active_items';
export const CREATE_TEAM = 'create_team';

export function getAuthData() {
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

export function signup(values) {
    const request = axios.post('/signup', values);

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

export function getFavoriteLocations() {
    const request = axios.get('/api/get-favorite-locations');

    return {
        type: GET_FAVORITE_LOCATIONS,
        payload: request
    };
}

export function selectLocation(location) {
    return {
        type: LOCATION_SELECTED,
        payload: location
    };
}

export function selectFavoriteLocation(location) {
    return {
        type: FAVORITE_LOCATION_SELECTED,
        payload: location
    };
}

export function selectTab(tab) {
    return {
        type: TAB_SELECTED,
        payload: tab
    };
}

export function resetActiveItems() {
    return {
        type: RESET_ACTIVE_ITEMS,
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

export function getUserReservations() {
    const request = axios.get('/api/get-user-reservations');

    return {
        type: GET_USER_RESERVATIONS,
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
export function getTeams() {
    const request = axios.get('/api/get-teams');

    return {
        type: GET_TEAMS,
        payload: request
    };
}

export function selectTeam(team) {
    return {
        type: TEAM_SELECTED,
        payload: team
    };
}

export function favoriteLocation(values, cb) {
    const request = axios.post('/api/favorite-location', values)
                         .then((data) => cb(data));

    return {
        type: FAVORITE_LOCATION,
        payload: request
    };
}

export function createTeam(values, cb) {
    const request = axios.post('/api/create-team', values)
                         .then((data) => cb(data));

    return {
        type: CREATE_TEAM,
        payload: request
    };
}
