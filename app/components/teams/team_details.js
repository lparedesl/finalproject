import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';

class TeamDetails extends Component {
    constructor() {
        super();

        this.state = {
            selectedTeam: 1
        };
    }

    render() {
        const {team} = this.props;

        if (!team) {
            return (
              <div>
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                        <h3>Please select a team or create a new one below.</h3>
                    </div>
                </div>
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                      <button type="button" class="btn btn-info btn-lg mt-ladda-btn ladda-button" data-style="zoom-in" data-size="l">
                          <span className="ladda-label">Create New Team</span>
                      </button>
                    </div>
                </div>
              </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <Header/>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <h2>nothing here yet</h2>
                    </div>
                    <div className="row">
                        <h2>nothing here yet</h2>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {team: state.activeTeam}
}

export default connect(mapStateToProps)(TeamDetails);
