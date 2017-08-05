import axios from 'axios';

export const GET_AUTH_DATA = 'get_auth_data';
export const GET_LOCATIONS = 'get_locations';
export const LOCATION_SELECTED = 'location_selected';
export const FIELD_SELECTED = 'field_selected';
export const GET_FIELD_RESERVATIONS = 'get_field_reservations';

export function getAuthData() {
    const request = axios.get('api/get-csrf-token');

    return {
        type: GET_AUTH_DATA,
        payload: request
    };
}

export function getLocations() {
    const request = axios.get('api/get-locations');

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

export function getFieldReservations(id) {
    const request = axios.post('api/field-schedule', {id: id});

    return {
        type: GET_FIELD_RESERVATIONS,
        payload: request
    };
}