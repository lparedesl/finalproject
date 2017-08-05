import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import SignIn from './components/user/signin_form';
import SignUp from './components/user/signup_form';
import ForgotPassword from './components/user/forgot_pass';
import Location from './components/locations/main';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/locations" component={Location}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#app')
);
