import {GET_AUTH_DATA} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_AUTH_DATA:
            return action.payload.data;

        default:
            return state;
    }
}