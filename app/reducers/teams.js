import _ from 'lodash';
import {GET_TEAMS} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_TEAMS:
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state;
    }
}
