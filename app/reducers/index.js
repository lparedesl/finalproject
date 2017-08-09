import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import AuthDataReducer from './auth_data';
import LocationsReducer from './locations';
import FavoriteLocationsReducer from './favorite_locations';
import TeamsReducer from './teams';
import ReservationsReducer from './reservations';
import ActiveTab from './active_tab';
import ActiveLocation from './active_location';
import ActiveFavoriteLocation from './active_favorite_location';
import ActiveTeam from './active_team';
import ActiveField from './active_field';
import FieldReservationsReducer from './field_reservations';

const rootReducer = combineReducers({
    authData: AuthDataReducer,
    locations: LocationsReducer,
    favoriteLocations: FavoriteLocationsReducer,
    teams: TeamsReducer,
    userReservations: ReservationsReducer,
    activeTab: ActiveTab,
    activeLocation: ActiveLocation,
    activeFavoriteLocation: ActiveFavoriteLocation,
    activeField: ActiveField,
    activeTeam: ActiveTeam,
    fieldReservations: FieldReservationsReducer,
    form: formReducer
});

export default rootReducer;
