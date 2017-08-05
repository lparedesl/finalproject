import React, {Component} from "react";

class Banner extends Component {
  renderImage() {
    return _.map(this.props.items, item => {
      return (<BannerItem key={item.id} data={item} selectTeam={(team) => this.props.selectTeam(team)}/>)
    })
  }

  render() {
    return (
      <div class="row">
        <div class="col-md-12">
          <div class="portlet light portlet-fit bordered">
            <div class="portlet-title">
              <div class="caption">
                <i class=" icon-layers font-green"></i>
                <span class="caption-subject font-green bold uppercase">Members</span>
              </div>
            </div>
            <div class="portlet-body">
              <div class="mt-element-card mt-card-round mt-element-overlay">
                <div class="row">
                  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    {this.renderImage()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Banner;
