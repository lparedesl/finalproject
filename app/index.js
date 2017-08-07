import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Teams from './components/teams/main';
import Home from './components/home';
import Authentication from './components/authentication';
import Dashboard from './components/dashboard';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/teams" component={Teams}/>

                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/user" component={Authentication}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#app')
);
