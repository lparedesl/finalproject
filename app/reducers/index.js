import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthDataReducer from './auth_data';
import LocationsReducer from './locations';
import TeamsReducer from './teams';
import ActiveLocation from './active_location';
import ActiveField from './active_field';
import FieldReservationsReducer from './field_reservations';
import ActiveTeam from './active_team';

const rootReducer = combineReducers({
    authData: AuthDataReducer,
    locations: LocationsReducer,
    activeLocation: ActiveLocation,
    activeField: ActiveField,
    fieldReservations: FieldReservationsReducer,
    teams: TeamsReducer,
    activeTeam: ActiveTeam,
    form: formReducer
});

export default rootReducer;
