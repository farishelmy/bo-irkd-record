import React, { Component, Fragment } from "react";
// import {updStkh} from '../../actions/stakehUpdateAction'
import Select from "react-select";

import { Button } from "reactstrap";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class EmailWizard extends Component {
  constructor() {
    super();
    this.state = {
      activityName: null,
      activityUri: null,
      markOnSel: null,
      workflowName: null,
      assignedTo: null,
      activityDateDue: null,
      icon: null,
      supervisor: null,
      priority: null,
      estDuration: null,
      stakehList: [],
      emailTo: [],
      subject: null,
      cc: [],
      bcc: []
    };
  }

  componentWillMount() {
    const {
      activityName,
      activityUri,
      workflowName,
      assignedTo,
      activityDateDue,
      icon,
      supervisor,
      priority,
      estDuration
    } = this.props.item

    const { locType } = this.props.location
    const stakehOptions = locType.map(itm => ({
      value: itm.uri,
      label: itm.Name
    }));
    this.setState({
      activityName: activityName,
      activityUri: activityUri,
      workflowName: workflowName,
      assignedTo: assignedTo,
      activityDateDue: activityDateDue,
      icon: icon,
      supervisor: supervisor,
      priority: priority,
      estDuration: estDuration,
      stakehList: stakehOptions,
      subject: activityName,
    });
  }

  handleChange = e => {
    const inputName = e.target.getAttribute("name");
    const inputVal = e.target.value;
    // ===""?e.target.value=null:e.target.value
    // console.log(e.target.value)

    this.setState({
      [inputName]: inputVal
    });
    console.log(inputName)
     console.log(inputVal)
  };

  handleTo = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ emailTo: param });
    // console.log(param)
  };

  handleCc = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ cc: param });
    // console.log(param)
  };

  handleBcc = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ bcc: param });
    // console.log(param)
  };

  render() {
    const {
      activityName,
      activityUri,
      workflowName,
      assignedTo,
      activityDateDue,
      icon,
      supervisor,
      priority,
      estDuration,
      stakehList,
      subject
    } = this.state;

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">
          Email Notifications
        </h1>
        <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
          <div className="text-center mt-3 mb-2">
            <img
              src={require("../../../img/management.svg")}
              alt="management"
              className=" img-dash"
            />
          </div>
          <div className="row justify-content-start mb-5">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                <label>To</label>
                <Select
                  name="emailTo"
                  options={stakehList}
                  onChange={this.handleTo}
                  className="basic-multi-select"
                  placeholder="Name"
                  isMulti
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
              
                  onChange={this.handleChange}
                  value={subject}
                />
              </div>
              <div className="row">
                <div className="col-sm-6 form-group">
                  <label>Cc</label>
                  <Select
                    name="cc"
                    options={stakehList}
                    onChange={this.handleCc}
                    className="basic-multi-select"
                    placeholder="Name"
                    isMulti
                  />
                </div>
                <div className="col-sm-6 form-group">
                  <label>Bcc</label>
                  <Select
                    name="bcc"
                    options={stakehList}
                    onChange={this.handleBcc}
                    className="basic-multi-select"
                    placeholder="Name"
                    isMulti
                  />
                </div>
                <div className="col-sm-6 form-group">
                  <label>
                    <input
                      name="is_enable_auto_scripting"
                      type="checkbox"
                      onChange={this.handleChange}
                      checked={activityName}
                    />{" "}
                    URL Reference
                  </label>
                </div>
                <div className="col-sm-6 form-group">
                  <label>
                    <input
                      name="is_enable_auto_scripting"
                      type="checkbox"
                      onChange={this.handleChange}
                      checked={activityName}
                    />{" "}
                    Attachment
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Body</label>
                <textarea
                  name="auto_scripting"
                  rows="10"
                  cols="50"
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
            <button type="button" className="btn btn-secondary">
              Close
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
EmailWizard.propTypes = {
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  session: state.session,
  layout: state.layout,
  activity: state.activity,
  location: state.location
});

export default connect(
  mapStateToProps,
  {}
)(EmailWizard);
