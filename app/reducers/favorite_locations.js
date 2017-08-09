import _ from 'lodash';
import {GET_FAVORITE_LOCATIONS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FAVORITE_LOCATIONS:
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state;
    }
}