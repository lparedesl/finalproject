import axios from 'axios';

export const GET_AUTH_DATA = 'get_auth_data';
export const SIGNIN = 'signin';
export const SIGNUP = 'signup';
export const GET_USER_INFO = 'get_user_info';
export const GET_LOCATIONS = 'get_locations';
export const GET_USER_RESERVATIONS = 'get_user_reservations';
export const LOCATION_SELECTED = 'location_selected';
export const LOCATION_UPDATED = 'location_updated';
export const FAVORITE_LOCATION_SELECTED = 'favorite_location_selected';
export const FIELD_SELECTED = 'field_selected';
export const RESERVE_FIELD = 'reserve_field';
export const GET_FIELD_RESERVATIONS = 'get_field_reservations';
export const GET_TEAMS = 'get_teams';
export const TEAM_SELECTED = 'team_selected';
export const TEAM_UPDATED = 'team_updated';
export const FAVORITE_LOCATION = 'favorite_location';
export const RESET_ACTIVE_ITEMS = 'reset_active_items';
export const CREATE_TEAM = 'create_team';
export const ADD_TEAM_MEMBER = 'add_team_member';

export function getAuthData() {
    const request = axios.get('/authentication/get-csrf-token');

    return {
        type: GET_AUTH_DATA,
        payload: request
    };
}

export function signin(values, cb) {
    const request = axios.post('/authentication/signin', values)
                         .then(() => cb());

    return {
        type: SIGNIN,
        payload: request
    };
}

export function signup(values, cb) {
    const request = axios.post('/authentication/signup', values)
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

export function getLocation(id) {
    const request = axios.post('/api/get-location', {id: id});

    return {
        type: LOCATION_UPDATED,
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

export function resetActiveItems() {
    return {
        type: RESET_ACTIVE_ITEMS,
        payload: location
    };
}

export function selectField(id) {
    const request = axios.post('/api/get-field', {id: id});

    return {
        type: FIELD_SELECTED,
        payload: request
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

export function getTeam(id) {
    const request = axios.post('/api/get-team', {id: id});

    return {
        type: TEAM_UPDATED,
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

export function addTeamMember(values, cb) {
    const request = axios.post('/api/add-team-member', values)
                         .then((data) => cb(data));

    return {
        type: ADD_TEAM_MEMBER,
        payload: request
    };
}
