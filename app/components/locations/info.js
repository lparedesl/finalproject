import _ from 'lodash';
import React, { Component } from "react";
import moment from 'moment';
import {connect} from 'react-redux';

class Info extends Component {
    constructor() {
        super();

        this.renderSportsTiles = this.renderSportsTiles.bind(this);
    }

    renderSportsTiles() {
        const {item} = this.props;

        return _.map(this.props[item].sports, sport => {
            return (
                <div className="tile" key={sport.id}>
                    <div className="tile-body" style={{backgroundImage: `url(${sport.img})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="tile-object">
                        <div className="name"> {sport.name} </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        const {item} = this.props;

        return (
            <div className="portlet light portlet-fit bordered">
                <div className="portlet-title">
                    <div className="caption">
                        <i className=" icon-info font-blue"></i>
                        <span className="caption-subject font-blue bold uppercase">Park Information</span>
                    </div>
                </div>
                <div className="portlet-body">
                    <div className="list-item-content">
                        <h3 className="uppercase">
                            <a href="javascript:;">Schedule</a>
                        </h3>
                        <p>
                            Open {this.props[item].location_schedule.days_long}
                        </p>
                        <p>
                            From {moment(this.props[item].open_time, "HH:mm:ss").format("h:mm A")} to {moment(this.props[item].close_time, "HH:mm:ss").format("h:mm A")}
                        </p>
                    </div>
                    <div className="list-item-content">
                        <h3 className="uppercase">
                            <a href="javascript:;">Sports</a>
                        </h3>
                        <div className="tiles">
                            {this.renderSportsTiles()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
    }
}

export default connect(mapStateToProps)(Info);
