import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import toastr from 'toastr';
import {getTeam} from '../../actions';
import {addTeamMember} from '../../actions';

class AddMemberForm extends Component {
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
        values.teamId = this.props.team.id;

        this.props.addTeamMember(values, res => {
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
                toastr['success'](`${res.data.first_name} ${res.data.last_name} was successfully added to team "${this.props.team.name}".`, 'Member Added');
                this.props.getTeam(this.props.team.id);
                this.props.history.push('/dashboard/teams');
            }
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="portlet light portlet-fit bordered">
                        <div className="portlet-title">
                            <div className="caption">
                                <i className="icon-user-follow font-green"></i>
                                <span className="caption-subject font-green bold uppercase">Add Member</span>
                            </div>
                        </div>
                        <div className="portlet-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <form role="form" className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <div id="errors"></div>
                                        <div className="form-body">
                                            <Field
                                                label="Email"
                                                placeholder="Enter email of new team member"
                                                name="email"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) errors.email = 'Enter an email';

    return errors;
}

function mapStateToProps(state) {
    return {
        team: state.activeTeam
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTeam: getTeam,
        addTeamMember: addTeamMember,
    }, dispatch)
}

export default reduxForm({
    validate,
    form: 'AddMemberForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(AddMemberForm))
);
