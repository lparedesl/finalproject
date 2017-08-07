import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ItemDetails from './item_details';
import ItemsList from './items_list';
import {getLocations} from '../actions';
import {getTeams} from '../actions';
import {getUserInfo} from '../actions';

class Content extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        this.props[`get${this.props.title}`]();
        this.props.getUserInfo();
    }

    isSignedIn() {
        if (this.props.userInfo) {
            return this.props.userInfo.id
        }

        return 99999
    }

    render() {
        return (
            <div>
                {console.log(this.props.teams)}
                <h1 className="page-title">
                    {this.props.title}
                </h1>
                <div className="row">
                    <div className="col-md-3">
                        <ItemsList
                            title={this.props.title}
                            items={this.props[this.props.title.toLowerCase()]}
                            fnName={this.props.fnName}
                        />
                    </div>
                    <div className="col-md-9">
                        <ItemDetails
                            titleSingular={this.props.titleSingular}
                            userId={this.isSignedIn()}
                            item={this.props[this.props.titleSingular]}
                            message={this.props.message}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locations,
        teams: state.teams,
        location: state.activeLocation,
        team: state.activeTeam,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getTeams: getTeams,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
