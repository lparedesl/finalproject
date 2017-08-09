import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Home from './components/home';
import Authentication from './components/authentication';
import Dashboard from './components/dashboard';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
            <div>
                {/*<Switch>*/}
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/user" component={Authentication}/>
                    <Route exact path="/" component={Home}/>
                {/*</Switch>*/}
            </div>
        </Router>
    </Provider>
    , document.querySelector('#app')
);
