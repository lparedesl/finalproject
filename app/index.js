import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/home';
import Authentication from './components/authentication';
import Profile from './components/user/profile';
import Content from './components/page_content';
import ReservationsContent from './components/reservations/content';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                <Switch>
                    <Route path="/dashboard/profile" component={Profile}/>
                    <Route path="/dashboard/locations" render={() =>
                        <Content
                            title="Locations"
                            titleSingular="location"
                            fnName="selectLocation"
                            message="Please select a location"
                            cmd="locationItem"
                        />
                    }/>
                    <Route path="/dashboard/teams" render={() =>
                        <Content
                            title="Teams"
                            titleSingular="team"
                            fnName="selectTeam"
                            message="Please select a team or create a new one below"
                            cmd="team"
                        />
                    }/>
                    <Route path="/dashboard/reservations" render={() =>
                        <ReservationsContent
                            title="Reservations"
                            titleSingular="reservation"
                            fnName="selectReservation"
                            message="Please select a reservation"
                            cmd="reservation"
                        />
                    }/>
                    <Route path="/user" component={Authentication}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
        </Router>
    </Provider>
    , document.querySelector('#app')
);
