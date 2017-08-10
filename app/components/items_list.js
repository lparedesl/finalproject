import _ from 'lodash';
import React, {Component} from "react";
import {connect} from 'react-redux';
import ListItem from './list_item';

class ItemsList extends Component {
    renderList() {
        const {title, fnName} = this.props;
        const items = title === "Favorite Locations" ? _.filter(this.props.locations, location => location.favorite) : this.props[title.toLowerCase()];

        return _.map(items, item => {
            return (
                <ListItem
                    key={item.id}
                    data={item}
                    fnName={fnName}
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
        teams: state.teams
    }
}

export default connect(mapStateToProps)(ItemsList);
