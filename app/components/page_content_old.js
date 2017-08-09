import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ItemsList from './items_list';
import ItemDetails from './item_details';
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
                <h1 className="page-title">
                    {this.props.title}
                </h1>
                <div className="row">
                    {console.log("FROM PAGE_CONTENT:", this.props.locations)}
                    <div className="col-md-3">
                        <ItemsList
                            title={this.props.title}
                            items={this.props[this.props.title.toLowerCase()]}
                            fnName={this.props.fnName}
                            location={this.props.location}
                        />
                    </div>
                    <div className="col-md-9">
                        <ItemDetails
                            titleSingular={this.props.titleSingular}
                            userId={this.isSignedIn()}
                            item={this.props[this.props.cmd]}
                            message={this.props.message}
                            location={this.props.location}
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
        locationItem: state.activeLocation,
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
