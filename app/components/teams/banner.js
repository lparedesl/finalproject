import _ from 'lodash';
import React, {Component} from "react";

class Banner extends Component {
  // renderTeamList() {
  //   return _.map(this.props.items, item => {
  //     return (
  //         <BannerItem
  //           key={item.id}
  //           data={item}
  //           selectTeam={(team) => this.props.selectTeam(team)}
  //         />
  //     )
  //   })
  // }

  render() {
    return (
      <div className="mt-element-list">
          <div className="mt-list-head list-simple ext-1 font-white bg-green-sharp">
              <div className="list-head-title-container">
                  <div className="list-date">Contact #</div>
                  <h3 className="list-title">Members</h3>
              </div>
          </div>
          <div className="mt-list-container list-simple ext-1">
              <ul>
                {/*{this.renderTeamList()}*/}
              </ul>
          </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Banner;
