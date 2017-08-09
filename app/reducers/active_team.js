import {TEAM_SELECTED, RESET_ACTIVE_ITEMS} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case TEAM_SELECTED:
            return action.payload;

        case RESET_ACTIVE_ITEMS:
            return null;
    }
    return state;
}
