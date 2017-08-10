import React, {Component} from 'react';
import $ from 'jquery';
import {Link, withRouter} from 'react-router-dom';
import toastr from 'toastr';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTeams} from '../../actions';
import {createTeam} from '../../actions';

class CreateTeam extends Component {
    renderTextField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-control ${touched && error ? 'has-error' : ''}`;

        return (
            <div className="form-group form-md-line-input">
                <label className="col-md-2 control-label" htmlFor="form_control_1">{field.label}</label>
                <div className="col-md-10">
                    <input type="text" className={className} id="form_control_1" placeholder={field.placeholder} autoComplete="off" {...field.input}/>
                    <div className="form-control-focus"> </div>
                    <span className="help-block">{touched ? error : ''}</span>
                </div>
            </div>
        );
    }

    onSubmit(values) {
        values.userId = this.props.userInfo.id;

        this.props.createTeam(values, res => {
            if (res.data.error) {
                return $("#errors").html(`<div class="alert alert-danger"><button class="close" data-close="alert"></button><span>${res.data.error}</span></div>`);
            }

            if (res.data) {
                toastr.options = {
                    closeButton    : true,
                    debug          : false,
                    positionClass  : "toast-bottom-right",
                    showDuration   : 1000,
                    hideDuration   : 1000,
                    timeOut        : 5000,
                    extendedTimeOut: 1000,
                    showEasing     : "swing",
                    hideEasing     : "linear",
                    showMethod     : "fadeIn",
                    hideMethod     : "fadeOut"
                };
                toastr['success'](`Team "${res.data.name}" was successfully created.`, 'Team Created');
                this.props.getTeams();
                this.props.history.push('/dashboard/teams');
            }
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form role="form" className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div id="errors"></div>
                <div className="form-body">
                    <Field
                        label="Team Name"
                        placeholder="Enter your team name"
                        name="teamName"
                        component={this.renderTextField}
                    />
                    <Field
                        label="Team Image Link"
                        placeholder="Enter a link for your team's image"
                        name="imgLink"
                        component={this.renderTextField}
                    />
                </div>
                <div className="form-actions">
                    <div className="row">
                        <div className="col-md-offset-2 col-md-10">
                            <Link className="btn green btn-outline" to="/dashboard/teams">Back</Link>
                            <button type="submit" className="btn btn-success uppercase pull-right">Create Team</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.teamName) errors.teamName = 'Enter a name for the team';
    // if (!values.imgLink) errors.imgLink = 'Enter a link for the image';
    // if (!values.end_year) errors.end_year = 'Enter an end year';
    // if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

    return errors;
}

function mapStateToProps(state) {
    return {
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTeams: getTeams,
        createTeam: createTeam,
    }, dispatch)
}

export default reduxForm({
    validate,
    form: 'CreateTeamForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateTeam))
);
