import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Banner from './banner';
import TeamImage from './team_image';

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
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                        <h3>Please select a team or create a new one below.</h3>
                        <button className="btn btn-circle blue btn-block btn-lg m-icon-big">Create New Team
                            <i className="m-icon-big-swapright m-icon-white"></i>
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <Header
                      name={team.name}
                    />
                    <Banner/>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <TeamImage
                          image={team.image}
                          name={team.name}
                        />
                    </div>
                    <div className="row">
                      <button className="btn btn-circle blue btn-block btn-lg m-icon-big">Add Members
                          <i className="m-icon-big-swapright m-icon-white"></i>
                      </button>
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
