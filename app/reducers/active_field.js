import {FIELD_SELECTED} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case FIELD_SELECTED:
            return action.payload.data;
    }
    return state;
}