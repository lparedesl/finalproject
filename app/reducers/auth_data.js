import {GET_AUTH_DATA, GET_USER_INFO} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_AUTH_DATA:
        case GET_USER_INFO:
            return action.payload.data;

        default:
            return state;
    }
}