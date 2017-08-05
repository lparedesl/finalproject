import {LOCATION_SELECTED} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case LOCATION_SELECTED:
            return action.payload;
    }
    return state;
}