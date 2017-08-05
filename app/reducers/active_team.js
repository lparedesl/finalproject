import {TEAM_SELECTED} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case TEAM_SELECTED:
            return action.payload;
    }
    return state;
}
