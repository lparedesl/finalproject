import React, {Component} from 'react';
import {connect} from 'react-redux';
import TeamDetails from './team_details';
import TeamList from './team_list';
import {getTeams} from '../../actions';

class Main extends Component {
    componentDidMount() {
        this.props.getTeams();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <TeamList
                        items={this.props.teams}
                    />
                </div>
                <div className="col-md-9">
                    <TeamDetails/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {teams: state.teams}
}

export default connect(mapStateToProps, {getTeams})(Main);
