import React, {Component} from "react";
import {connect} from 'react-redux';

class TeamImage extends Component {
    render() {
        const {team} = this.props;

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="thumbnail">
                        <img src={team.image} alt={team.name} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {team: state.activeTeam,}
}

export default connect(mapStateToProps)(TeamImage);
