import {TAB_SELECTED} from '../actions';

export default function(state = null, action) {
    switch(action.type) {
        case TAB_SELECTED:
            return action.payload;
    }
    return state;
}