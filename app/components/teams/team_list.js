import _ from 'lodash';
import React, {Component} from "react";
import BannerItem from './banner_item'

class Banner extends Component {
  renderTeamList() {
    return _.map(this.props.users, users => {
      return (
          <BannerItem
            key={users.id}
            data={users}
          />
      )
    })
  }

  render() {
    const {users} = this.props;
    return (
      <div className="portlet light portlet-fit bordered">
            <div className="mt-element-list">
                <div className="mt-list-head list-simple font-white bg-blue">
                    <div className="list-head-title-container">
                        <div className="list-date">Contact Number</div>
                        <h3 className="list-title">Team Members</h3>
                    </div>
                </div>
                <div className="mt-list-container list-simple">
                    <ul>
                        {this.renderTeamList()}
                    </ul>
                </div>
            </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Banner;
