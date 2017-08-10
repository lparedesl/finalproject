import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectLocation} from '../actions';
import {selectFavoriteLocation} from '../actions';
import {selectTeam} from '../actions';

const ListItem = (props) => {
    const {data} = props;

    return (
        <li className="mt-list-item">
            <div className="list-icon-container">
                <a onClick={() => props[props.fnName](data)}>
                    <i className="fa fa-angle-right"></i>
                </a>
            </div>
            <div className="list-item-content">
              <h3 className="uppercase">
                <p>{data.name}</p>
              </h3>
            </div>
        </li>
    );
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectLocation: selectLocation,
        selectFavoriteLocation: selectFavoriteLocation,
        selectTeam: selectTeam,
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ListItem);
