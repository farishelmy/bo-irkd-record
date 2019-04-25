import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setActivePage } from '../../actions/layoutInitAction'  
import { activityUri, activityName, setShowFab, getDetails, checkResult, toggleErr, showComplete, showSuspend, setWizardPage, getResult } from '../../actions/activityAction'
import { setSearchParam } from "../../actions/searchAction"
import { setListActivity } from '../../actions/workflowAction'
import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabActivityContent' 
import CardPanel from '../workflow/AcivityCardPanel'
import SuspendModal from '../activity/modal/SuspendModal'
import CompleteModal from '../activity/modal/CompleteModal'
import ReassignModal from '../activity/modal/ReassignModal'
import Resume from '../activity/modal/ResumeModal'

import update from 'immutability-helper'



class ActivityPanel extends Component {
  constructor() {
    super();
    this.state = {
      Activity: [],
      selAct: null,
      resume: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activity.activityStatus !== this.props.activity.activityStatus
    ) {
      const { activityStatus } = this.props.activity;
      const act = activityStatus.map(res => ({ ...res, isSel: false }));
      // console.log(act)
      this.setState({
        Activity: act
      });
    }
    if (prevProps.activity.listActivity !== this.props.activity.listActivity) {
      const { listActivity } = this.props.activity;
      const act = listActivity.map(res => ({ ...res, isSel: false }));
      // console.log(listActivity)
      this.setState({
        Activity: act
      });
    }
  }

  FabAction = actionName => {
    const { 
        session: { user: { _id: bId }},
        activity: { activityUri, activityName, checkResult }
      } = this.props;
    switch (actionName) {
      case "records":
        this.props.setSearchParam({
          _action: "SEARCHRECORD",
          _id: bId,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(
            JSON.stringify([
              {
                op: "EQUALS",
                field: "&&Related Records of Activity",
                value1: activityUri
              }
            ])
          )
        });
        this.props.setActivePage("wizardActivity");
        this.props.setWizardPage("record");
        // this.props.setActivePage('record')

        //Breadcrumb
        this.props.setNewBread(false, {
          id: activityUri,
          label: activityName,
          activePage: "wizardActivity",
          isActive: true
        });
        break;

      case "details":
        this.props.setActivePage("wizardActivity");
        this.props.setWizardPage("general");

        this.props.setSearchParam({
          _action: "SEARCHRECORD",
          _id: bId,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(
            JSON.stringify([
              {
                op: "EQUALS",
                field: "&&Related Records of Activity",
                value1: activityUri
              }
            ])
          )
        });

        //Breadcrumb
        this.props.setNewBread(false, {
          id: activityUri,
          label: activityName,
          activePage: "wizardActivity",
          isActive: true
        });

        break;

      case "assign":
        this.props.toggleErr(true);

        break;

      case "complete":
        this.props.showComplete(true);

        if (checkResult === true) {
            console.log("tesd")
          const param = {
            _action: "GETRESULT",
            _activityUri: activityUri,
            _id: bId
          };
          this.props.getResult(param);
        }
        break;

      case "suspend":
        this.props.showSuspend(true);
        break;

      case "resume":
        this.setState({resume:true});
        break;

      default:
        // this.props.stakehAction(e.target.name)
        break;
    }
  };

  //Selection
  markOnSel = (
    workflowName,
    activityUri,
    activityName,
    assignedTo,
    priority,
    dateStart,
    dateDue,
    iconCls,
    supervisor,
    isSel
  ) => {
    const {
      user: { _id: bId }
    } = this.props.session;

    if (iconCls !== "activity-suspend") {
      const param = {
        _action: "CHECKRESULT",
        _activityUri: activityUri,
        _id: bId
      };
      this.props.checkResult(param);
    }

    const { Activity } = this.state;
    // console.log(listAct)
    const itmIdx = Activity.findIndex(itm => itm.activityUri === activityUri);
    const desIdx = Activity.findIndex(itm => itm.isSel === true);
    const value = Activity.find(itm => itm.activityUri === activityUri);

    const newList =
      desIdx === -1
        ? update(Activity, {
            [itmIdx]: { isSel: { $set: true } }
          })
        : update(Activity, {
            [itmIdx]: { isSel: { $set: true } },
            [desIdx]: { isSel: { $set: false } }
          });
    // // select
    if (itmIdx === desIdx) {
      this.props.setShowFab(false);
      this.props.activityUri(null);
      this.props.activityName(null);
    } else {
      this.props.setShowFab(true);
    }

    this.props.getDetails([value]); //Set activity details
    this.props.activityUri(activityUri); //Set Workflow Uri
    this.props.activityName(activityName); //Set Workflow Name

    this.setState({
      Activity: newList,
      selAct: value
    });
  };

  updList = () => {
    const {
      workflow: { wrkflSel },
      session: {
        user: { _id: bId }
      }
    } = this.props;
    this.props.setListActivity({
      _action: "SEARCHACTIVITY",
      workflowUri: wrkflSel,
      _id: bId
    });
  };

  modalResume = () => {
    this.setState({ resume: true });
  };

  //Toggle Modal
  closedModal = value => {
    // console.log(val)
    this.setState({
      resume: value
    });
  };

  render() {
    const { Activity, selAct, resume } = this.state;
    // console.log(selAct)
    const { showFab } = this.props.activity;

    return (
      <Fragment>
        {Activity.length !== 0 ? (
          Activity.map((item, idx) => (
            <CardPanel
              key={item.activityUri}
              workflowName={item.workflowName}
              activityUri={item.activityUri}
              activityName={item.activityName}
              assignedTo={item.assignedTo}
              priority={item.priority}
              dateStart={item.activityDateDue}
              dateDue={item.estDuration}
              iconCls={item.iconCls}
              supervisor={item.supervisor}
              isSel={item.isSel}
              markOnSel={this.markOnSel}
            />
          ))
        ) : (
          <strong>There is no activity.</strong>
        )}

        {showFab ? <Fab conf={selAct} FabAction={this.FabAction} /> : ""}

        <ReassignModal updList={this.updList} />
        <CompleteModal updList={this.updList} />
        <SuspendModal updList={this.updList} />
        {resume !== false ? (
          <Resume
            conf={selAct}
            resume={resume}
            closedModal={this.closedModal}
            updList={this.updList}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

ActivityPanel.propTypes = {
    session: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
    getDetails: PropTypes.func.isRequired, 
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,   
    setNewBread: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired, 
    activityName: PropTypes.func.isRequired,
    checkResult: PropTypes.func.isRequired,
    setListActivity:PropTypes.func.isRequired,
    toggleErr: PropTypes.func.isRequired,
    showComplete: PropTypes.func.isRequired,
    showSuspend: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
    setSearchParam: PropTypes.func.isRequired,
    getResult: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    session: state.session,
    workflow: state.workflow,
    activity: state.activity,

})
export default connect(mapStateToProps,
    {
        setActivePage,       
        setShowFab,        
        getDetails,
        setNewBread,      
        activityUri, 
        activityName,
        checkResult,
        setListActivity,
        toggleErr,
        showComplete,
        showSuspend,
        setWizardPage,
        setSearchParam,
        getResult

    })(ActivityPanel)

