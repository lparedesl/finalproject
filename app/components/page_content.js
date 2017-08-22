import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemsList from './items_list';
import ItemDetails from './item_details';
import {getFieldReservations} from '../actions';

class Content extends Component {
    shouldComponentUpdate(nextProps) {
        const {cmd, field, getFieldReservations} = this.props;
        if (this.props.location !== nextProps.location && this.props[cmd]) {
            getFieldReservations(field.id);
        }

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
                            key={this.props.location}
                            item={this.props.cmd}
                            message={this.props.message}
                            location={this.props.location}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
        field: state.activeField
    }
}

export default connect(mapStateToProps, {getFieldReservations})(Content);