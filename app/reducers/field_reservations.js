import {GET_FIELD_RESERVATIONS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FIELD_RESERVATIONS:
            return action.payload.data;

        default:
            return state;
    }
}