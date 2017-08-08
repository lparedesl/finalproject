import {GET_USER_RESERVATIONS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_USER_RESERVATIONS:
            return action.payload.data;

        default:
            return state;
    }
}