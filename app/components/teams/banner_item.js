import React from "react";

const BannerItem = (props) => {
  const {data} = props;

  return (
    <div class="mt-card-item">
      <div class="mt-card-avatar mt-overlay-1">
        <img src="../assets/pages/img/avatars/team5.jpg" />
        <div class="mt-overlay">
          <ul class="mt-info">
            <li>
              <a class="btn default btn-outline" href="javascript:;">
                <i class="icon-magnifier"></i>
              </a>
            </li>
            <li>
              <a class="btn default btn-outline" href="javascript:;">
                <i class="icon-link"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-card-content">
        <h3 class="mt-card-name">{data.first_name} {data.last_name}</h3>
        <p class="mt-card-desc font-grey-mint">{data.phone}</p>
        <div class="mt-card-social">
          <ul>
            <li>
              <a href="javascript:;">
                <i class="icon-social-facebook"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-social-twitter"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="icon-social-dribbble"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default BannerItem;
