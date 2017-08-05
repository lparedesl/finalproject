import _ from 'lodash';
import React, {Component} from "react";
import {connect} from 'react-redux';
import ListItem from './list_item';
import {selectTeam} from '../../actions';

class TeamList extends Component {
    renderList() {
        return _.map(this.props.items, item => {
            return (
                <ListItem
                    key={item.id}
                    data={item}
                    selectTeam={(team) => this.props.selectTeam(team)}
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
                        <span className="caption-subject font-green bold uppercase">Teams</span>
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

export default connect(null, {selectTeam})(TeamList);
