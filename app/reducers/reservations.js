import _ from 'lodash';
import {GET_USER_RESERVATIONS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_USER_RESERVATIONS:
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state;
    }
}