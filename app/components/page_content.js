import React, {Component} from 'react';
import ItemsList from './items_list';
import ItemDetails from './item_details';

class Content extends Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.title !== nextProps.title) {
            this.props.resetActiveItems();
        }
        return true;
    }

    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">
                    {this.props.title}
                </h1>
                <div className="row">
                    <div className="col-md-3">
                        <ItemsList
                            title={this.props.title}
                            fnName={this.props.fnName}
                        />
                    </div>
                    <div className="col-md-9">
                        <ItemDetails
                            item={this.props.cmd}
                            message={this.props.message}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;