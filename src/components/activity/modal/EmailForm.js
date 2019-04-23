import React, { Component, Fragment } from "react";
import Select from "react-select";

import Tooltip from "rc-tooltip";
import update from "immutability-helper";
import Pagination from "rc-pagination";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
 
import { setStakehType, viewStakehMember } from "../../../actions/location";

import BrowseLoc from "../modal/BrowseLoc"

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
  Input,
  Collapse
} from "reactstrap";

class EmailForm extends Component {
  constructor() {
    super();
    this.state = {
      markOnSel: null,
      optLoc: [],
      emailTo: [],
      subject: null,
      cc: [],
      bcc: [],
      showChild: false,
      nav: [{ childName: "Root", childUri: "root" }],
      listLoc: [],
      current: 1,
      collapseTo: false,
      collapseCc: false,
      collapseBcc: false,
      locVal: [],
      is_enable_auto_scripting:false,
      attachment:false,
      email: null,
      conf: null
    };
  }

  componentWillMount() {
    const {
      session: {
        user: { _id: bId }
      },
      conf,
      email,
    } = this.props;
    // console.log(haha)
    this.props.setStakehType({ _action: "LISTLOCATION", _id: bId });
    this.setState({
      conf:conf,
      email:email
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.locType !== this.props.location.locType) {
      const { locType } = this.props.location;
      const opt = locType.map(itm => ({ value: itm.uri, label: itm.Name }));
      this.setState({
        optLoc: opt,
        listLoc: locType
      });
    }
  }

  toggle = () => {
    const { email } = this.state
    this.props.closedModal(!email)
  };

  handleChange = e => {
    const inputName = e.target.getAttribute("name");
    const inputVal = e.target.value;
    // ===""?e.target.value=null:e.target.value
    // console.log(e.target.value)

    this.setState({
      [inputName]: inputVal
    });
    console.log(inputName);
    console.log(inputVal);
  };

  handleChangeCheckbox=(event)=>{
    // e.preventDefault()
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name    
            
    this.setState({
        [name]:value
    })  
    // console.log(name)  
    // console.log(value)
}    

  handleTo = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ emailTo: param.label });
    // console.log(param)
  };

  handleCc = param => {
    console.log(param);
    this.setState({ cc: param.label  });
    // console.log(param)
  };

  handleBcc = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ bcc: param.label  });
    // console.log(param)
  };

  btnCollapse = (e) => {
    // console.log(e.target.name)
    switch (e.target.name) {
      case "inputTo":
        const collapseTo = this.state.collapseTo
          this.setState({ collapseTo: !collapseTo, collapseCc: false, collapseBcc: false })
        break 
      case "inputCc":
        const collapseCc = this.state.collapseCc
          this.setState({ collapseTo: false, collapseCc: !collapseCc, collapseBcc: false })
        break 
      case "inputBcc":
        const collapseBcc = this.state.collapseBcc
          this.setState({ collapseTo: false, collapseCc: false, collapseBcc: !collapseBcc })
        break 
      default:
    }
  };

  addBtn = (value) => {
    // console.log(value)
    const {collapseTo, emailTo, collapseCc, cc, collapseBcc, bcc} = this.state
    
    if(collapseTo===true){
      const newVal = update(emailTo,{$push:[value]})
      this.setState({emailTo:newVal})
    }

    if(collapseCc===true){
      const newVal = update(cc,{$push:[value]})
      this.setState({cc:newVal})
    }

    if(collapseBcc===true){
      const newVal = update(bcc,{$push:[value]})
      this.setState({bcc:newVal})
    }

    // this.props.toggleClose(false)
  };

  render() {
    const {
      stakehList,
      subject,
      collapseTo,
      collapseCc,
      collapseBcc,      
      bcc,
      cc,
      emailTo,
      email,
      conf,
      is_enable_auto_scripting,
      attachment,
    } = this.state;
    // console.log(conf)

    return (
      <div>
        <Modal
          isOpen={email}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Send Email</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    onChange={this.handleChange}
                    value={`Workflow Name: ${conf.workflowName}`}
                  />
                </div>
                <div className="form-group">
                  <label>To</label>
                  <div className="row">
                    <Select
                      placeholder="New Group"
                      isMulti
                      className="col"
                      value={emailTo}
                      noOptionsMessage={() => null}
                      onChange={this.handleTo}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                    />
                    <Tooltip
                      placement="top"
                      overlay={
                        <div style={{ height: 20, width: "100%" }}>
                          Search Location
                        </div>
                      }
                      arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                      <img name="inputTo" src={require('../../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>

                {collapseTo?<BrowseLoc changeInput={this.addBtn}/>:""}

                <div className="form-group">
                  <label>Cc</label>
                  <div className="row">
                    <Select
                      placeholder="New Group"
                      isMulti
                      className="col"
                      value={cc}
                      noOptionsMessage={() => null}
                      onChange={this.handleCc}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                    />

                    <Tooltip
                      placement="top"
                      overlay={
                        <div style={{ height: 20, width: "100%" }}>
                          Search Location
                        </div>
                      }
                      arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                      <img name="inputCc" src={require('../../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>

                {collapseCc?<BrowseLoc changeInput={this.addBtn}/>:""}

                <div className="form-group">
                  <label>Bcc</label>
                  <div className="row">
                    <Select
                      className="col"
                      placeholder="New Group"
                      isMulti
                      value={bcc}
                      noOptionsMessage={() => null}
                      onChange={this.handleBcc}
                      // onClick={this.handleClick}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                    />

                    <Tooltip
                      placement="top"
                      overlay={
                        <div style={{ height: 20, width: "100%" }}>
                          Search Location
                        </div>
                      }
                      arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                      <img name="inputBcc" src={require('../../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>

                {collapseBcc?<BrowseLoc changeInput={this.addBtn} />:""}

                <div className="row">
                  <div className="col-sm-6 form-group">
                    <label>
                      <input
                        name="is_enable_auto_scripting"
                        type="checkbox"
                        onChange={this.handleChangeCheckbox}
                        checked={is_enable_auto_scripting}
                      />{" "}
                      URL Reference
                    </label>
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>
                      <input
                        name="attachment"
                        type="checkbox"
                        onChange={this.handleChangeCheckbox}
                        checked={attachment}
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
  record: PropTypes.object.isRequired,
  setStakehType: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired
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
    setStakehType,
    viewStakehMember
  }
)(EmailForm);
