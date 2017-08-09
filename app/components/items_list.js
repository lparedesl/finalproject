import _ from 'lodash';
import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListItem from './list_item';
import {selectLocation} from '../actions';
import {selectFavoriteLocation} from '../actions';
import {selectTeam} from '../actions';

class ItemsList extends Component {
    handleSelectItem(item) {
        this.props[this.props.fnName](item);
    }

    renderList() {
        const {title, locations, userInfo} = this.props;
        // const items = title === "Favorite Locations" ? _.filter(locations, item => {
        //     const usersTemp = _.filter(item.users, user => user.id === userInfo.id);
        //     if (usersTemp[0]) {
        //         return true
        //     }
        // }) : this.props[title.toLowerCase()];

        const items = title === "Favorite Locations" ? this.props.favoriteLocations : this.props[title.toLowerCase()];

        return _.map(items, item => {
            return (
                <ListItem
                    key={item.id}
                    data={item}
                    selectItem={(item) => this.props[this.props.fnName](item)}
                    location={this.props.location}
                />
            )
        })
    }

    render() {
        return (
            <div className="portlet light portlet-fit bordered">
                <div className="portlet-title">
                    <div className="caption">
                        <i className=" icon-layers font-green"></i>
                        <span className="caption-subject font-green bold uppercase">{this.props.title}</span>
                    </div>
                </div>
                <div className="portlet-body">
                    <div className="mt-element-list">
                        <div className="mt-list-container list-news">
                            <ul>
                                {this.renderList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locations,
        favoriteLocations: state.favoriteLocations,
        teams: state.teams,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectLocation: selectLocation,
        selectFavoriteLocation: selectFavoriteLocation,
        selectTeam: selectTeam,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
