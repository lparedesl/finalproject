import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthDataReducer from './auth_data';
import LocationsReducer from './locations';
import ActiveLocation from './active_location';
import ActiveField from './active_field';
import FieldReservationsReducer from './field_reservations';

const rootReducer = combineReducers({
    authData: AuthDataReducer,
    locations: LocationsReducer,
    activeLocation: ActiveLocation,
    activeField: ActiveField,
    fieldReservations: FieldReservationsReducer,
    form: formReducer
});

export default rootReducer;