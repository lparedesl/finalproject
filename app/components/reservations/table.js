import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';

$.DataTable = require('datatables.net-bs');

const columns = [
    {
        title: 'Location',
        width: '20%',
        data: 'location'
    },
    {
        title: 'Field',
        width: '20%',
        data: 'field'
    },
    {
        title: 'Sport',
        width: '20%',
        data: 'sport'
    },
    {
        title: 'Date',
        width: '20%',
        data: 'resDate'
    },
    {
        title: 'Time',
        width: '20%',
        data: 'resTime'
    }
];

class Table extends Component {
    componentDidMount() {
        $("#dataTables").DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/English.json'
            },
            dom: '<"table-wrapper"lftip>',
            columns: columns,
            data: this.props.reservations,
            bStateSave: true,
            pagingType: "full_numbers",
            lengthMenu: [
                [5, 10, 20, -1],
                [5, 10, 20, "All"]
            ],
            pageLength: 5,
            // columnDefs: [{
            //     orderable: false,
            //     targets: [0]
            // }],
            order: [
                [1, "asc"]
            ]
        });
    }

    componentWillUnmount(){
        $('.dataTables_wrapper')
        .find('table')
        .DataTable()
        .destroy(true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.reservations.length !== this.props.reservations.length) {
            reloadTableData(nextProps.reservations);
        }
        return false;
    }

    render() {
        return (
            <table className="table table-striped table-bordered table-hover table-checkable order-column" id="dataTables">
            </table>
        )
    }
}

function reloadTableData(reservations) {
    const table = $('.dataTables_wrapper')
    .find('table')
    .DataTable();
    table.clear();
    table.rows.add(reservations);
    table.draw();
}

function mapStateToProps(state) {
    return {reservations: state.userReservations}
}

export default connect(mapStateToProps)(Table);