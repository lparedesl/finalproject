import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthData from './auth_data';

const rootReducer = combineReducers({
    authData: AuthData,
    form: formReducer
});

export default rootReducer;