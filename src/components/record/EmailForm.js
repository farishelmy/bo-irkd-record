import React, { Component, Fragment } from "react";
import Select from "react-select";

import Tooltip from "rc-tooltip";
import update from "immutability-helper";
import Pagination from "rc-pagination";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
 
import { setStakehType, viewStakehMember } from "../../actions/location";

import ListCard from "../activity/modal/ListCard";
import ListCardChild from "../activity/modal/ListCardChild";
import BrowseLoc from "../record/BrowseLoc"

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
      click:false,
      email: null,
      conf: null
    };
  }

  BrowseLoc = (a)=>{
    console.log(a)
  }

  componentWillMount() {
    const {
      session: {
        user: { _id: bId }
      },
      conf,
      email,
      emailTo
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

  handleTo = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ emailTo: param });
    // console.log(param)
  };

  handleCc = param => {
    console.log(param);
    this.setState({ cc: param });
    // console.log(param)
  };

  handleBcc = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ bcc: param });
    // console.log(param)
  };

  btnCollapse = (e) => {
    console.log(e.target.name)
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

  // handleClick = () => {
  //   const {click} = this.state
  //   console.log(click)
  //   this.setState({
  //     click:click
  //   })
  // }

  test=(a)=>{
    console.log(a)
  }

  addBtn = (name, id) => {
    const val = { label: name, value: id };
    const { click } = this.state;

    // locVal.push.apply(locVal, [val]);
    // console.log(customVal)
    if(click===true){
      this.setState({
        bcc: val,
      })
    }
    this.setState({
      cc: val,
      emailTo: val
    });

    // this.props.addAccessControl(customVal)
    // this.props.toggleClose(false)
  };

  getChild = (stakehId, name) => {
    const {
      user: { _id: bId }
    } = this.props.session;
    const { nav } = this.state;

    const param = {
      _action: "LISTLOCATION",
      _id: bId,
      URI: stakehId,
      ANODE: "A"
    };
    console.log(param);
    this.props.viewStakehMember(param);

    const newNav = update(nav, {
      $push: [
        {
          childName: name,
          childUri: stakehId
        }
      ]
    });
    // console.log(newNav)

    this.setState({
      showChild: true,
      nav: newNav
    });
  };

  backToParent = () => {
    const { childUri, nav } = this.state;
    // console.log(nav[nav.length - 2].childUri)
    const {
      user: { _id: bId }
    } = this.props.session;

    const param = {
      _action: "LISTLOCATION",
      _id: bId,
      URI: nav[nav.length - 2].childUri,
      ANODE: "A"
    };
    // console.log(param)
    this.props.viewStakehMember(param);

    const newNav = nav.slice(0, nav.length - 1);
    this.setState({ nav: newNav });

    if (nav[nav.length - 2].childUri === "root") {
      this.setState({
        showChild: false
      });
    }
  };

  onChangePaging = page => {
    const {
      user: { _id: bId }
    } = this.props.session;
    const { pageSize, stakehLabel } = this.props.location;
    // console.log(page)

    const param = {
      _action: "LISTLOCATION",
      _id: bId,
      page: page,
      start: (page - 1) * pageSize,
      filterType:
        stakehLabel === "All Locations"
          ? stakehLabel
          : stakehLabel === "Organization"
          ? stakehLabel
          : stakehLabel === "Position"
          ? stakehLabel
          : stakehLabel === "Person"
          ? stakehLabel
          : stakehLabel === "Unknown"
          ? stakehLabel
          : null
    };
    // console.log(param)
    this.props.setStakehType(param);

    this.setState({
      current: page
    });
  };

  render() {
    const {
      stakehList,
      subject,
      optLoc,
      showChild,
      nav,
      listLoc,
      current,
      collapseTo,
      collapseCc,
      collapseBcc,      
      bcc,
      cc,
      emailTo,
      email,
      conf,
      click
    } = this.state;
    const { totalCount, pageSize, locationMember } = this.props.location;
    const {haha} =this.props
    console.log(haha)

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
                    value={`Record Number: ${conf['Record Number']}`}
                    // value={locVal}
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
                      // onClick={this.handle}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null
                      }}
                    />
                    <Tooltip
                      // onClick={this.btnCollapse} 
                      // name='inputTo'
                      placement="top"
                      overlay={
                        <div style={{ height: 20, width: "100%" }}>
                          Search Location
                        </div>
                      }
                      arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                      <img name="inputTo" src={require('../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>
                {collapseTo?<BrowseLoc collapseTo={click} emailTo={this.test} />:""}
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
                      <img name="inputCc" src={require('../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>
                {collapseCc?<BrowseLoc/>:""}
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
                      <img name="inputBcc" src={require('../../img/user-group.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnCollapse} />
                    </Tooltip>
                  </div>
                </div>
                {collapseBcc?<BrowseLoc/>:""}
                <div className="row">
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
