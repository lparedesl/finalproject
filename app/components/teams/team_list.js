import _ from 'lodash';
import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import BannerItem from './banner_item'

class Banner extends Component {
    renderTeamList() {
        const {team} = this.props;

        return _.map(team.users, user => {
            return (
                <BannerItem
                    key={user.id}
                    data={user}
                />
            )
        })
    }

    render() {
        return (
        <div className="row">
            <div className="col-md-12">
                <Link className="btn blue btn-outline reserve-btn" to="/dashboard/teams/add-team-member">Add Team Member</Link>
                <div className="portlet light portlet-fit bordered">
                    <div className="mt-element-list">
                        <div className="mt-list-head list-simple font-white bg-blue">
                            <div className="list-head-title-container">
                                <div className="list-date">Contact Number</div>
                                <h3 className="list-title">Team Members</h3>
                            </div>
                        </div>
                        <div className="mt-list-container list-simple">
                            <ul>
                                {this.renderTeamList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        team: state.activeTeam
    }
}

export default connect(mapStateToProps)(Banner);
