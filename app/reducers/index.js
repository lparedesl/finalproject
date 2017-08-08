import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthDataReducer from './auth_data';
import LocationsReducer from './locations';
import TeamsReducer from './teams';
import ActiveTab from './active_tab';
import ActiveLocation from './active_location';
import ActiveTeam from './active_team';
import ActiveField from './active_field';
import FieldReservationsReducer from './field_reservations';

const rootReducer = combineReducers({
    authData: AuthDataReducer,
    locations: LocationsReducer,
    teams: TeamsReducer,
    activeTab: ActiveTab,
    activeLocation: ActiveLocation,
    activeField: ActiveField,
    activeTeam: ActiveTeam,
    fieldReservations: FieldReservationsReducer,
    form: formReducer
});

export default rootReducer;
