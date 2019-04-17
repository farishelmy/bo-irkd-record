import React, { Component, Fragment } from "react";
import Select from "react-select";

import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleEmail } from "../../actions/backendAction";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
  Row,
  CardBody,
  Input
} from "reactstrap";

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
        markOnSel: null,
        stakehList: [],
        emailTo: [],
        subject: null,
        cc: [],
        bcc: []
    };
  }

    componentWillMount() {
      const {  } = this.props

      const { locType } = this.props.location
      const stakehOptions = locType.map(itm => ({
        value: itm.uri,
        label: itm.Name
      }));
      this.setState({ 
       
      });
    }

  toggle = () => {
    const { showEmail } = this.props.record;
    this.props.toggleEmail(!showEmail);
  };

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
    const { showEmail } = this.props.record;
    const { stakehList, subject } = this.state;

    return (
      <div>
        <Modal isOpen={showEmail} toggle={this.toggle} className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Send Email</ModalHeader>
          <ModalBody>
            <div className="row justify-content-start mb-5">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    onChange={this.handleChange}
                    // value={subject}
                  />
                </div>
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
                        // checked={activityName}
                      />{" "}
                      URL Reference
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Send</Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
EmailForm.propTypes = {
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  session: state.session,
  layout: state.layout,
  activity: state.activity,
  location: state.location,
  record: state.rec
});

export default connect(
  mapStateToProps,
  {
    toggleEmail
  }
)(EmailForm);
