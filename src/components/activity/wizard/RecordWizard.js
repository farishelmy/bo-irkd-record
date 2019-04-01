import React, { Component, Fragment } from "react";
// import {updStkh} from '../../actions/stakehUpdateAction'
import Select from "react-select";

import { Button } from "reactstrap";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class RecordWizard extends Component {
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
        No Records
      </Fragment>
    );
  }
}
RecordWizard.propTypes = {
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
)(RecordWizard);
