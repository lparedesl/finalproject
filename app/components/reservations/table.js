import _ from 'lodash';
import React, {Component} from 'react';
// import $ from 'jquery';
// import DataTable from 'datatables.net';
import {connect} from 'react-redux';

class Table extends Component {
    constructor() {
        super();

        this.renderRows = this.renderRows.bind(this);
    }

    renderRows() {
        const {reservations} = this.props;

        return _.map(reservations, reservation => {
            return (
                <tr className="odd gradeX" key={reservation.id}>
                    <td>
                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                            <input type="checkbox" className="checkboxes" value="1" />
                            <span></span>
                        </label>
                    </td>
                    <td> {reservation.field.location.name} </td>
                    <td>
                        {`Field ${reservation.field.field_number}`}
                    </td>
                    <td>
                        <span className="label label-sm label-success"> {reservation.field.sport.name} </span>
                    </td>
                </tr>
            )
        });
    }

    render() {
        return (
            <table className="table table-striped table-bordered table-hover table-checkable order-column" id="sample_2">
                <thead>
                <tr>
                    <th className="table-checkbox">
                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                            <input type="checkbox" className="group-checkable" data-set="#sample_2 .checkboxes" />
                            <span></span>
                        </label>
                    </th>
                    <th> Location </th>
                    <th> Field Number </th>
                    <th> Sport </th>
                    {/*<th> Date </th>*/}
                    {/*<th> Time </th>*/}
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
        reservations: state.userReservations,
    }
}

export default connect(mapStateToProps)(Table);
