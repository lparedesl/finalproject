import {SET_FIRST_FIELD, FIELD_SELECTED} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case SET_FIRST_FIELD:
            return action.payload;

        case FIELD_SELECTED:
            return action.payload.data;
    }
    return state;
}