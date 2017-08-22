import React, {Component} from "react";

class BannerItem extends Component {
    constructor() {
        super();

        this.renderUserName = this.renderUserName.bind(this);
    }

    renderUserName() {
        const {data} = this.props;

        if (data.first_name) {
            return (
                <h3 className="uppercase">
                    <a href="javascript:;">{data.first_name} {data.last_name}</a>
                </h3>
            )
        }

        return (
            <h3 className="uppercase">
                <a href="javascript:;">{data.email} </a><small><i> {data.status}</i></small>
            </h3>
        )
    }

    render() {
        const {data} = this.props;

        return (
            <li className="mt-list-item">
                <div className="list-icon-container done">
                    <i className="icon-user"></i>
                </div>
                <div className="list-datetime"> {data.phone} </div>
                <div className="list-item-content">
                    {this.renderUserName()}
                </div>
            </li>
        )
    }
}

export default BannerItem;
