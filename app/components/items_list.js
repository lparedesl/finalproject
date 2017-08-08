import _ from 'lodash';
import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListItem from './list_item';
import {selectLocation} from '../actions';
import {selectTeam} from '../actions';

class ItemsList extends Component {
    renderList() {
        return _.map(this.props.items, item => {
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectLocation: selectLocation,
        selectTeam: selectTeam,
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ItemsList);
