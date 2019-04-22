import React, { Component, Fragment } from "react";
import Select from "react-select";

import Tooltip from "rc-tooltip";
import update from "immutability-helper";
import Pagination from "rc-pagination";
import "rc-tooltip/assets/bootstrap.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setStakehType, viewStakehMember } from "../../actions/location";
// import { emailTo } from "../record/EmailForm"

import ListCard from "../activity/modal/ListCard";
import ListCardChild from "../activity/modal/ListCardChild";
 


class BrowseLoc extends Component {
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
      collapse: false,
      locVal: [],
      click: false,
      email: null,
      customVal:[],
      collapseTo: false,
      collapseCc: false,
      collapseBcc: false,
    };
  }

  componentWillMount() {
    const {
      session: {
        user: { _id: bId }
      },
      collapseTo,
      email
    } = this.props;
    console.log(collapseTo)
    this.props.setStakehType({ _action: "LISTLOCATION", _id: bId });
    this.setState({
        collapseTo: collapseTo
    });
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
 
  addBtn = (name, id) => {
    const val = { label: name, value: id };
    const {customVal, collapseTo, emailTo} = this.state
    const newVal = update(customVal,{$push:[val]})

    if(collapseTo===true){
    this.emailTo({newVal})
    }

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
    // console.log(param);
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
      collapse,
      bcc,
      cc,
      emailTo,
      email,
      conf
    } = this.state;
    const { totalCount, pageSize, locationMember } = this.props.location;

    return (
    <div>
      <div className="form-group modal-list">
        {showChild !== false ? (
          <div>
            <div
              className="d-flex justify-content-between recListMenu"
              onClick={this.backToParent}
            >
              <div className="left-col d-flex align-items-center">
                <div className="icon mr-2">
                  <i className="fa fa-angle-left" />
                  {/* <img src={require(`../../../img/search.svg`)} className='listIcn' alt='...' /> */}
                </div>
                <p className="title text-primary mb-0">
                  {nav[nav.length - 1].childName}
                </p>
              </div>
            </div>
            {locationMember.map(item => (
              <ListCardChild
                key={item.uri}
                name={item.Name}
                uri={item.uri}
                iconCls={item.iconCls}
                leaf={item.leaf}
                getParent={this.getChild}
                addBtn={this.addBtn}
                getChild={this.getChild}
              />
            ))}
          </div>
        ) : (
          listLoc.map(item => (
            <ListCard
              key={item.uri}
              stakehId={item.uri}
              name={item.Name}
              iconCls={item.iconCls}
              leaf={item.leaf}
              addBtn={this.addBtn}
              getChild={this.getChild}
            />
          ))
        )}

        <div className="d-flex justify-content-end p-2">
          <Pagination
            onChange={this.onChangePaging}
            current={current}
            pageSize={pageSize}
            total={totalCount}
          />
        </div>
      </div>
    </div>
    );
  }
}
BrowseLoc.propTypes = {
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  setStakehType: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired,
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
    viewStakehMember,
  }
)(BrowseLoc);
