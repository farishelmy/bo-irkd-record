import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
// import ListTemplate from "./ListTemplate"

// import Breadcrumb from "../layouts/Breadcrumb"
import { setActivePage } from "../../actions/layoutInitAction"
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName, populateWorkflow, panelContent,  toggleSearchWorkflow, setRecordStore, setListActivity, setWizardPage } from "../../actions/workflowAction"
import { setNewBread } from "../../actions/breadcrumbAction"

import Tooltip from "rc-tooltip"
import update from "immutability-helper"
import Pagination from 'rc-pagination'

import Search from "../workflow/search/ModalWorkflow"
import CardView from "./CardView"
import ListView from "./ListView"
import Fab from "../fab/FabWorkflow"

import "rc-tooltip/assets/bootstrap.css";
import 'rc-pagination/assets/index.css';
import moment from 'moment'


class ListWorkflow extends Component {
  constructor() {
    super();
    this.state = {
      workList: [],
      current: 1,
      searchToggle:false        
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.workflow.listWorkflow !== this.props.workflow.listWorkflow) {
      const { listWorkflow } = this.props.workflow;
      // console.log(listWorkflow)
      const listWkflw = listWorkflow.map(res => ({ ...res, isSel: false }));
      //  console.log(listWkflw)
      this.setState({
        workList: listWkflw,
      });
    }
  }

  ///Direct Page
  setActivePage = (page) => {
    // console.log(page)

      const { 
        workflow: {  
          wrkflSel,
          workflowTemplate,
          workflowName 
        },
        session:{ 
          user: { 
            _id: bId 
          }
        }
      }= this.props

      if(page==="workflowContent"){
  
        this.props.setShowFab(false)
        this.props.setActivePage(page)
        this.props.setWizardPage("general")
        // this.props.panelContent(true)
    
        //List Activity
        this.props.setListActivity({_action: "SEARCHACTIVITY", workflowUri: wrkflSel, _id: bId})
    
        //Breadcrumb
        this.props.setNewBread(false, {
          id: wrkflSel,
          label: workflowName,
          activePage: page,
          isActive: true
        })
      }

      if(page==="viewWorkflow"){

        this.props.setActivePage(page)
        this.props.setWizardPage("general") 
        this.props.setShowFab(false)   

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
        }        
        this.props.setRecordStore(recordDet)

         //Breadcrumb
         this.props.setNewBread(false, {
          id: wrkflSel,
          label: workflowName,
          activePage: page,
          isActive: true
        })



      }
    }

  //Selection
  markOnSel = ( workflowName,markOnSel,workflowUri,isSel,supervisor,iconCls,dateStart,dateDue,jobNo,priority ) => {
    const {
      user: { _id: bId }
    } = this.props.session;
    const val = [
      {
        workflowName,
        markOnSel,
        workflowUri,
        isSel,
        supervisor,
        iconCls,
        dateStart,
        dateDue,
        jobNo,
        priority
      }
    ]
    
    this.props.getDetails(val); //Set Workflow Details
    this.props.setSelWorkFlow(workflowUri); //Set Workflow Uri
    this.props.setWorkflowName(workflowName); //Set Workflow Name

    const { workList } = this.state;
    // console.log({workList} )
    const itmIdx = workList.findIndex(itm => itm.workflowUri === workflowUri);
    const desIdx = workList.findIndex(itm => itm.isSel === true);

    const newWrkfwList =
      desIdx === -1
        ? update(workList, {
            [itmIdx]: { isSel: { $set: true } }
          })
        : update(workList, {
            [itmIdx]: { isSel: { $set: true } },
            [desIdx]: { isSel: { $set: false } }
          });
    // // select
    if (itmIdx === desIdx) {
      this.props.setShowFab(false)
      this.props.setSelWorkFlow(null)
    } else {
      this.props.setShowFab(true)
    }

    this.setState({
      workList: newWrkfwList
    });
  };

  //Change view Card and List
  changeToViewCard = e => {
    const { cardView } = this.props.workflow;
    this.props.setCardView(!cardView);
  };

  onChangePaging = (page) => {
    const {
      user: { _id: bId }
    } = this.props.session
    const { pageSize, workflowSearchParam } = this.props.workflow
    const { searchToggle } = this.state

    if(searchToggle!==true){
      const workflow = {
        startDateFrom: '01/01/2000',
        startDateTo: moment(),
        _action: 'SEARCHWORKFLOW',
        page: page,
        start: (page-1)*pageSize,
        _id: bId
      }
    
      this.props.populateWorkflow(workflow)

      this.setState({
        current: page,
      })
    }

    if(searchToggle===true){

      this.props.toggleSearchWorkflow(false)
      this.props.populateWorkflow({
        workflowName: workflowSearchParam.WorkflowName,
        dueDateFrom: workflowSearchParam.DateDueStart,
        dueDateTo: workflowSearchParam.DateDueEnd, 
        startDateFrom: workflowSearchParam.DateStartedStart ,
        startDateTo: workflowSearchParam.DateStartedEnd,
        completeDateFrom: workflowSearchParam.DateCompletedStart ,
        completeDateTo: workflowSearchParam.DateCompletedEnd ,
        _action: "SEARCHWORKFLOW",
        page: page,
        start: (page-1)*pageSize,
        _id: bId,
      })

      this.setState({
        current: page,
      })
    }
  }

  searchWorkflow=()=>{
    this.props.toggleSearchWorkflow(true) 
  }

  render() {
    const { cardView, showFab, pageSize, totalCount } = this.props.workflow;
    const { workList, current, searchToggle } = this.state;
    const { newBread } = this.props.breadcrumb
    // console.log(newBread)

    const rec = workList.map(itm =>
      cardView ? (
        <CardView
          key={itm.workflowUri}
          workflowName={itm.workflowName}
          workflowUri={itm.workflowUri}
          iconCls={itm.iconCls}
          markOnSel={this.markOnSel}
          isSel={itm.isSel}
          supervisor={itm.supervisor}
          dateStart={itm.dateStarted}
          dateDue={itm.dateDue}
          jobNo={itm.jobNumber}
          priority={itm.priority}
        />
      ) : (
        <ListView
          key={itm.workflowUri}
          workflowName={itm.workflowName}
          workflowUri={itm.workflowUri}
          markOnSel={this.markOnSel}
          isSel={itm.isSel}
          iconCls={itm.iconCls}
          dateStart={itm.dateStarted}
          dateDue={itm.dateDue}
          jobNo={itm.jobNumber}
          priority={itm.priority}
        />
      )
    )

    return (
      <Fragment>
        <section className="forms">
          <div className="container-fluid">
            <header>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h1 className="h3 display">
                  <strong>{searchToggle!==true?newBread.label:"Search Workflow"}</strong>
                </h1>

                <div className="d-flex align-items-center">

                  <Tooltip
                      placement="top"
                      overlay={<div style={{ height: 20, width: '100%' }}>Search Workflow</div>}
                      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary" onClick={this.searchWorkflow}>
                    <i className="fa fa-search"></i>
                    </button>
                    </Tooltip>

                  <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: "100%" }}>Change to Card</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                      <i className="fa fa-th" aria-hidden="true" />
                    </button>
                  </Tooltip>

                  {/* <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ height: 20, width: "100%" }}>
                        Sort by latest creation
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  >
                    <button
                      className="btn btn-sm btn-primary ml-2"
                      alt="Sort"
                      onClick={this.sortItem}
                    >
                      <i className="fa fa-sort-amount-asc" aria-hidden="true" />
                    </button>
                  </Tooltip>   */}

                </div>
              </div>

              {/* { 
                activePage === "listOfWorkflow" ? 
                  <ListTemplate />
               : activePage === "SearchWorkflow" ? 
                  <Search />
               :""
              } */}

            </header>

            <div className="row">
              {cardView === false ?
                workList.length !== 0 ?
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
                            Date Start
                          </p>
                        </div>
                        <div className="col p-2">
                          <p className="card-title mb-1 font-weight-bold text-muted">
                            Date Due
                          </p>
                        </div>
                      </div>
                    </div>
                    {rec}
                  </div>
                  : "" : rec}
            </div>

            {showFab ? (
              <Fab FabRec={this.setActivePage} />
            ) : (
                ""
              )}

            <Search/>

            <div className="modal-footer justify-content-center">
              <Pagination onChange={this.onChangePaging} current={current} pageSize={pageSize} total={totalCount} />
            </div>

          </div>
        </section>
      </Fragment>
    );
  }
}

ListWorkflow.propTypes = {
  layout: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  workflow: PropTypes.object.isRequired,
  breadcrumb: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setCardView: PropTypes.func.isRequired,
  setSelWorkFlow: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
  setListActivity: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
  setRecordStore: PropTypes.func.isRequired,
  // setPageTitle: PropTypes.func.isRequired,
  setWorkflowName: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  populateWorkflow: PropTypes.func.isRequired,
  panelContent: PropTypes.func.isRequired,
  toggleSearchWorkflow: PropTypes.func.isRequired,
  
}
const mapStateToProps = state => ({
  session: state.session,
  workflow: state.workflow,
  layout: state.layout,
  breadcrumb: state.breadcrumb
});
export default connect(
  mapStateToProps,
  {
    setActivePage,
    setCardView,
    setSelWorkFlow,
    setShowFab,
    setListActivity,
    getDetails,
    setNewBread,
    setRecordStore,
    // setPageTitle,
    setWorkflowName,
    setWizardPage,
    populateWorkflow,
    panelContent,
    toggleSearchWorkflow
  }
)(ListWorkflow);
