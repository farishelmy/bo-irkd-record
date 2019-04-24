import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setActivePage } from "../../actions/layoutInitAction";
import {
  getDetails,
  activityUri,
  activityName,
  setCardView,
  setShowFab,
  setWizardPage,
  checkResult,
  getResult,
  setListActDue,
  toggleSearchActivity,
  populateActivity,
  toggleErr,
  showComplete,
  showSuspend
} from "../../actions/activityAction";
import {
  getDetailsWorkflow,
  setRecordStore,
  setListActivity
} from "../../actions/workflowAction";
import { setSearchParam } from "../../actions/searchAction"
import { setNewBread } from "../../actions/breadcrumbAction";

import Pagination from "rc-pagination";
import Tooltip from "rc-tooltip";
import update from "immutability-helper";

import CardView from "./CardView";
import ListView from "./ListView";
import Fab from "../../components/fab/FabActivity";
import Search from "../activity/search/ModalActivity";
import ReassignModal from "../activity/modal/ReassignModal";
import CompleteModal from "../activity/modal/CompleteModal";
import SuspendModal from "../activity/modal/SuspendModal";
import EmailForm from "../activity/modal/EmailForm"
import Resume from "../activity/modal/ResumeModal"

import "rc-pagination/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

class ListActivity extends Component {
  constructor() {
    super();
    this.state = {
      listAct: [],
      selAct: null,
      current: 1,
      searchToggle: false,
      email:false,
      resume:false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activity.listActivityDue !== this.props.activity.listActivityDue
    ) {
      const { listActivityDue } = this.props.activity;
      // console.log(listActivityDue)
      const act = listActivityDue.map(res => ({ ...res, isSel: false }));
      //  console.log(listWkflw)
      this.setState({
        listAct: act
      });
    }
    if (prevProps.activity.listActivity !== this.props.activity.listActivity) {
      const { listActivity } = this.props.activity;
      // console.log(listActivityDue)
      const act = listActivity.map(res => ({ ...res, isSel: false }));
      //  console.log(listWkflw)
      this.setState({
        listAct: act,
        searchToggle: true
      });
    }
  }

  //Direct Page To WorkFlow Detail
  setActivePage = page => {
    const {
      user: { _id: bId }
    } = this.props.session;
    const {
      activityName,
      listActivityDue,
      activityUri,
      checkResult,
      activityDet
    } = this.props.activity;
    const workflowName = activityDet.map(itm => itm.workflowName).toString();

        //Details
    if (page === "wizardActivity") {
        // console.log(page)

        // this.props.setPageSubject(workflowTemplate)
        this.props.setActivePage(page);
        this.props.setWizardPage("general");
        this.props.setShowFab(false);

        //Record Wizard
        this.props.setSearchParam({
            _action: "SEARCHRECORD",
            _id:bId,
            searchOrder: 0,
            jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Related Records of Activity", value1: activityUri }]))
        })    

        // Breadcrumb
        this.props.setNewBread(false, {
            id: activityUri,
            label: activityName,
            activePage: page,
            isActive: true
        });
    } 
    //Reassign
    else if (page === "reassignActivity") {
        this.props.toggleErr(true);
    } 
    //Suspend
    else if (page === "suspend") {
      this.props.showSuspend(true);
    } 

     //Resume
     else if (page === "resume") {
      this.setState({resume:true});
    } 
    //Complete
    else if (page === "complete") {
      this.props.showComplete(true);
      if (checkResult === true) {
        const param = {
          _action: "GETRESULT",
          _activityUri: activityUri,
          _id: bId
        };
        this.props.getResult(param);
      }
    } 
    //Show workflow
    else if (page === "workflow") {
      this.props.setActivePage("workflowContent");

      // Breadcrumb
      this.props.setNewBread(false, {
        id: workflowName,
        label: workflowName,
        activePage: "workflowContent",
        isActive: true
      });

      const workflow = {
        workflowName: workflowName,
        _action: "SEARCHWORKFLOW",
        _id: bId
      };
      this.props.getDetailsWorkflow(workflow);

      //Record Wizard
      const recordDet = {
        _id: bId,
        _action: "SEARCHRECORD",
        jsonQuery: JSON.stringify([
          {
            op: "EQUALS",
            field: "%26%26Related+Records+of+Workflow",
            value1: workflowName
          }
        ]),
        searchOrder: "0"
      };
      this.props.setRecordStore(recordDet);

      //List Activity
      const workflowDet = {
        _action: "SEARCHACTIVITY",
        workflowName: workflowName,
        _id: bId
      };
      this.props.setListActivity(workflowDet);
    }
    //email
    else if (page === "email") {
        this.setState({email:true})
    }
    //Show Records
    else if (page === "showRecords") {
        this.props.setActivePage("wizardActivity");
        this.props.setWizardPage("record");
        this.props.setShowFab(false);

        //Record Wizard
        this.props.setSearchParam({
            _action: "SEARCHRECORD",
            _id:bId,
            searchOrder: 0,
            jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Related Records of Activity", value1: activityUri }]))
        })     

        // Breadcrumb
        this.props.setNewBread(false, {
            id: activityUri,
            label: activityName,
            activePage: "wizardActivity",
            isActive: true
        });
    }
  };

  //Selection
  markOnSel = (
    activityName,
    activityUri,
    markOnSel,
    workflowName,
    assignedTo,
    activityDateDue,
    iconCls,
    isSel,
    supervisor,
    priority,
    estDuration
  ) => {
      
    const {
      user: { _id: bId }
    } = this.props.session;

    if(iconCls!=="activity-suspend"){
      const param = {
        _action: "CHECKRESULT",
        _activityUri: activityUri,
        _id: bId
      };
      this.props.checkResult(param);
    }

    const { listAct } = this.state;
    // console.log(listAct)
    const itmIdx = listAct.findIndex(itm => itm.activityUri === activityUri);
    const desIdx = listAct.findIndex(itm => itm.isSel === true);
    const value = listAct.find(itm => itm.activityUri === activityUri)   

    const newWrkfwList =
      desIdx === -1
        ? update(listAct, {
            [itmIdx]: { isSel: { $set: true } }
          })
        : update(listAct, {
            [itmIdx]: { isSel: { $set: true } },
            [desIdx]: { isSel: { $set: false } }
          });
    // // select
    if (itmIdx === desIdx) {
      this.props.setShowFab(false);
      this.props.activityUri(null);
    } else {
      this.props.setShowFab(true);
    }

    this.props.getDetails([value]); //Set Workflow Details
    this.props.activityUri(activityUri); //Set Workflow Uri
    this.props.activityName(activityName); //Set Workflow Name

    this.setState({
      listAct: newWrkfwList,
      selAct: value
    });
  };

  //Change view Card and List
  changeToViewCard = e => {
    const { cardView } = this.props.activity;
    this.props.setCardView(!cardView);
  };

  //Search
  searchActivity = () => {
    this.props.toggleSearchActivity(true);
  };

  //Paging
  onChangePaging = page => {
    const {
      user: { _id: bId }
    } = this.props.session;
    const { pageSize, activityParam } = this.props.activity;
    const { searchToggle } = this.state;

    if (searchToggle !== true) {
      const param = {
        _action: "LISTACTDUE",
        page: page,
        start: (page - 1) * pageSize,
        _id: bId
      };

      this.props.setListActDue(param);

      this.setState({
        current: page
      });
    }

    if (searchToggle === true) {
      // console.log(activityParam)
      const param = {
        _action: "SEARCHACTIVITY",
        activityName: activityParam.activityName,
        workflowName: activityParam.workflowName,
        assignedTo: activityParam.assignedTo,
        supervisor: activityParam.supervisor,
        escalatedTo: activityParam.escalatedTo,
        dueDateFrom: activityParam.dueDateFrom,
        dueDateTo: activityParam.dueDateTo,
        startDateFrom: activityParam.startDateFrom,
        startDateTo: activityParam.startDateTo,
        completeDateFrom: activityParam.completeDateFrom,
        completeDateTo: activityParam.completeDateTo,
        excludeActivityNotStart: activityParam.excludeActivityNotStart,
        excludeCompletedActivity: activityParam.excludeCompletedActivity,
        page: page,
        start: (page - 1) * pageSize,
        _id: bId
      };
      this.props.populateActivity(param);
      // console.log(param)

      this.setState({
        current: page
      });
    }
  };

  //Toggle Modal
  closedModal=(value)=>{
    // console.log(val)
    this.setState({
      email:value,
      resume:value
    })
  }

  updList=()=>{
    const {
      user: { _id }
    } = this.props.session;
    this.props.setListActDue({_action:"LISTACTDUE", _id})
  }

  render() {
    const { cardView, showFab, pageSize, totalCount } = this.props.activity;

    const { listAct, current, searchToggle, email, selAct, resume } = this.state;
    // console.log(selAct)

    const rec = listAct.map(itm =>
      cardView ? (
        <CardView
          key={itm.activityUri}
          activityName={itm.activityName}
          activityUri={itm.activityUri}
          workflowName={itm.workflowName}
          assignedTo={itm.assignedTo}
          activityDateDue={itm.activityDateDue}
          iconCls={itm.iconCls}
          markOnSel={this.markOnSel}
          isSel={itm.isSel}
          supervisor={itm.supervisor}
          priority={itm.priority}
          estDuration={itm.estDuration}
        />
      ) : (
        <ListView
          key={itm.activityUri}
          activityName={itm.activityName}
          activityUri={itm.activityUri}
          workflowName={itm.workflowName}
          assignedTo={itm.assignedTo}
          activityDateDue={itm.activityDateDue}
          iconCls={itm.iconCls}
          markOnSel={this.markOnSel}
          isSel={itm.isSel}
          supervisor={itm.supervisor}
          priority={itm.priority}
          estDuration={itm.estDuration}
        />
      )
    );

    return (
      <Fragment>
        <section className="forms">
          <div className="container-fluid">
            <header>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h1 className="h3 display">
                  <strong>
                    {searchToggle !== true
                      ? "List Activity Due"
                      : "Search Activity"}
                  </strong>
                </h1>

                <div className="d-flex align-items-center">
                  <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ height: 20, width: "100%" }}>
                        Search activity
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  >
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={this.searchActivity}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </Tooltip>

                  <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ height: 20, width: "100%" }}>
                        Change to Card
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  >
                    <button
                      className="btn btn-sm btn-primary ml-2"
                      onClick={this.changeToViewCard}
                    >
                      <i className="fa fa-th" aria-hidden="true" />
                    </button>
                  </Tooltip>

                  {/* <Tooltip
                        placement="top"
                        overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                        <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>

                    </button>

                    </Tooltip> */}
                </div>
              </div>
            </header>

            <div className="row">
              {cardView === false ? (
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="p-2 img-fluid img-scale" />
                      <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">
                          Title
                        </p>
                      </div>
                      <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">
                          Workflow
                        </p>
                      </div>
                      <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">
                          Assigned To
                        </p>
                      </div>
                      <div className="col p-2">
                        <p className="card-title mb-1 font-weight-bold text-muted">
                          Due Date
                        </p>
                      </div>
                    </div>
                  </div>
                  {rec}
                </div>
              ) : (
                rec
              )}
            </div>

            {showFab ? (
              <Fab
                conf={selAct}
                FabRec={this.setActivePage}
              />
            ) : (
              ""
            )}

            <Search />
            <ReassignModal updList={this.updList} />
            <CompleteModal updList={this.updList} />
            <SuspendModal updList={this.updList} />
            {resume!==false?<Resume conf={selAct} resume={resume} closedModal={this.closedModal} updList={this.updList} />:""}  
            {email!==false?<EmailForm conf={selAct} email={email} closedModal={this.closedModal} />:""}  


            <div className="modal-footer justify-content-center">
              <Pagination
                onChange={this.onChangePaging}
                current={current}
                pageSize={pageSize}
                total={totalCount}
              />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

ListActivity.propTypes = {
  session: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setCardView: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
  setSearchParam:PropTypes.func.isRequired,
  // setPageTitle:PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  activityUri: PropTypes.func.isRequired,
  activityName: PropTypes.func.isRequired,
  setWizardPage: PropTypes.func.isRequired,
  toggleErr: PropTypes.func.isRequired,
  showComplete: PropTypes.func.isRequired,
  checkResult: PropTypes.func.isRequired,
  getResult: PropTypes.func.isRequired,
  setListActDue: PropTypes.func.isRequired,
  showSuspend: PropTypes.func.isRequired,
  toggleSearchActivity: PropTypes.func.isRequired,
  populateActivity: PropTypes.func.isRequired,
  getDetailsWorkflow: PropTypes.func.isRequired,
  setRecordStore: PropTypes.func.isRequired,
  setListActivity: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  session: state.session,
  activity: state.activity
});
export default connect(
  mapStateToProps,
  {
    setActivePage,
    setCardView,
    setShowFab,
    getDetails,
    setNewBread,
    setSearchParam,
    // setPageTitle,
    // setPageSubject,
    activityUri,
    activityName,
    setWizardPage,
    toggleErr,
    showComplete,
    checkResult,
    getResult,
    setListActDue,
    showSuspend,
    toggleSearchActivity,
    populateActivity,
    getDetailsWorkflow,
    setRecordStore,
    setListActivity
  }
)(ListActivity);
