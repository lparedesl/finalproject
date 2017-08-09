import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import CreateTeamForm from './create_team_form';

class StartHeader extends Component {
    render() {
        const {message} = this.props;

        return (
            <Router>
                <div>
                    <Switch>
                        <Route
                            path="/dashboard/teams/create-team"
                            component={CreateTeamForm}
                        />
                        <Route
                            exact path="/dashboard/teams"
                            render={() =>
                                <div>
                                    <h3>{message}</h3>
                                    <Link to="/dashboard/teams/create-team" className="btn blue btn-block btn-lg m-icon-big">Create New Team
                                        <i className="m-icon-big-swapright m-icon-white"></i>
                                    </Link>
                                </div>
                            }
                        />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default StartHeader;
