import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setActivePage } from '../../../actions/layoutInitAction'
import { setCardView, activityUri, setShowFab, getDetails, activityName, setWizardPage, toggleErr, showComplete, showSuspend } from '../../../actions/activityAction'
import { setNewBread } from '../../../actions/breadcrumbAction'
import { getDetailsWorkflow, setRecordStore, setListActivity } from '../../../actions/workflowAction'

import Fab from '../../fab/FabActivity'
import Search from '../search/ModalActivity'
import CardView from '../CardView'
import ListView from '../ListView'
import ReassignModal from '../modal/ReassignModal'
import CompleteModal from '../modal/CompleteModal'
import SuspendModal from '../modal/SuspendModal'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class SearchActivity extends Component {

    constructor() {
        super()
        this.state = {
            ListAct: [],
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.activity.listActivity !== this.props.activity.listActivity) {
            const { listActivity } = this.props.activity
            // console.log(listActivity)
            const listAct = listActivity.map(res => ({ ...res, isSel: false }))
            //  console.log(listWkflw)
            this.setState({
                ListAct: listAct
            })
        }
    }

    //Direct Page To WorkFlow Detail
    setActivePage = (page) => {
        console.log(page)

        const { user: { _id: bId } } = this.props.session
        const { activityName, checkResult, activityDet }=this.props.activity  
        const workflowName = activityDet.map(itm => itm.workflowName).toString()  

      
        if (page === 'wizardActivity'){

            // console.log(page)          

            // this.props.setPageSubject(workflowTemplate)
            this.props.setActivePage(page)
            this.props.setWizardPage("general") 
            this.props.setShowFab(false)      

            // Breadcrumb
            this.props.setNewBread(false,{
                id: activityUri, 
                label: activityName, 
                activePage: page, 
                isActive: true,
            })  
        }         
        
        else if (page === 'reassignActivity'){
            this.props.toggleErr(true)
        }

        else if (page === 'suspend'){
            this.props.showSuspend(true)
        }

        else if (page === 'complete'){          
            this.props.showComplete(true)
            if (checkResult=== true){
                const param ={

                    _action: "GETRESULT",
                    _activityUri: activityUri, 
                    _id: bId,
                }
                this.props.getResult(param)
            }
        }

        else if (page === 'workflow'){

            this.props.setActivePage('workflowContent')

            // Breadcrumb
            this.props.setNewBread(false,{
                id: workflowName, 
                label: workflowName, 
                activePage: page, 
                isActive: true,
            }) 

            const workflow = {
                workflowName: workflowName,
                _action: "SEARCHWORKFLOW",
                _id: bId,
            }
            this.props.getDetailsWorkflow(workflow)

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
            this.props.setRecordStore(recordDet)

             //List Activity
            const workflowDet = {
                _action: "SEARCHACTIVITY",
                workflowName: workflowName,
                _id: bId
            }
            this.props.setListActivity(workflowDet)
        }
    }


    //Selection
    markOnSel = (activityName, activityUri, markOnSel, workflowName, assignedTo, activityDateDue, iconCls, isSel, supervisor, priority, estDuration) => {

        const val = [{ activityName, activityUri, markOnSel, workflowName, assignedTo, activityDateDue, iconCls, isSel, supervisor, priority, estDuration }]

        this.props.getDetails(val) //Set Workflow Details
        this.props.activityUri(activityUri)  //Set Workflow Uri
        this.props.activityName(workflowName)  //Set Workflow Name


        const { ListAct } = this.state
        // console.log(listAct)
        const itmIdx = ListAct.findIndex(itm => itm.activityUri === activityUri)
        const desIdx = ListAct.findIndex(itm => itm.isSel === true)

        const newWrkfwList = desIdx === -1 ?
            update(ListAct, {
                [itmIdx]: { isSel: { $set: true } }
            })
            : update(ListAct, {
                [itmIdx]: { isSel: { $set: true } },
                [desIdx]: { isSel: { $set: false } }
            })

        // select
        if (itmIdx === desIdx) {
            this.props.setShowFab(false)
            this.props.activityUri(null)
        }
        else {
            this.props.setShowFab(true)
        }

        this.setState({
            ListAct: newWrkfwList

        })
    }

    //Change view Card and List
    changeToViewCard = (e) => {
        const { cardView } = this.props.activity
        this.props.setCardView(!cardView)
    }





    render() {

        const { cardView, showFab } = this.props.activity

        const { ListAct } = this.state
        // console.log(ListAct)

        const rec = ListAct.map(itm => cardView ?
            <ListView
                key={itm.activityUri}
                activityName={itm.activityName}
                activityUri={itm.activityUri}
                workflowName={itm.workflowName}
                assignedTo={itm.assignedTo}
                activityDateDue={itm.activityDateDue}
                icon={itm.iconCls}
                markOnSel={this.markOnSel}
                isSel={itm.isSel}
                supervisor={itm.supervisor}
                priority={itm.priority}
                estDuration={itm.estDuration}
            />
            :
            <CardView
                key={itm.activityUri}
                activityName={itm.activityName}
                activityUri={itm.activityUri}
                workflowName={itm.workflowName}
                assignedTo={itm.assignedTo}
                activityDateDue={itm.activityDateDue}
                icon={itm.iconCls}
                markOnSel={this.markOnSel}
                isSel={itm.isSel}
                supervisor={itm.supervisor}
                priority={itm.priority}
                estDuration={itm.estDuration}
            />

        )


        return (
            <Fragment>                

                <section className="forms">
                    <div className="container-fluid">
                        <header>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <h1 className="h3 display"><strong>Search Activity</strong></h1>

                                <div className="d-flex align-items-center">

                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Create new activity</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                    >
                                        <button className="btn btn-sm btn-primary" onClick={this.createNewActivity} name="createNewAct" data-name="Create New" data-pagename="createNewAct">
                                            <i className="fa fa-tasks" name="createNewAct" data-name="Create New" data-pagename="createNewAct"></i>
                                        </button>
                                    </Tooltip> */}

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Change to Card</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                    >
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.changeToViewCard}>
                                            <i className="fa fa-th" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip>


                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                    >
                                        <button className="btn btn-sm btn-primary ml-2" alt="Sort" onClick={this.sortItem}>
                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>

                                        </button>

                                    </Tooltip> */}
                                </div>

                            </div>

                            <Search />
                        </header>

                        <div className="row">
                            {cardView !== false ? 
                                ListAct.length!==0?
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="p-2 img-fluid img-scale" />
                                                <div className="col p-2">
                                                    <p className="card-title mb-1 font-weight-bold text-muted">Title</p>
                                                </div>
                                                <div className="col p-2">
                                                    <p className="card-title mb-1 font-weight-bold text-muted">Workflow</p>
                                                </div>
                                                <div className="col p-2">
                                                    <p className="card-title mb-1 font-weight-bold text-muted">Assigned To</p>
                                                </div>
                                                <div className="col p-2">
                                                    <p className="card-title mb-1 font-weight-bold text-muted">Due Date</p>
                                                </div>
                                            </div>
                                        </div>
                                    {rec}
                                    </div>:"" : rec}
                        </div>



                        {showFab ? <Fab
                            FabRec={this.setActivePage}
                            delBtn={this.delBtn}
                        /> : ''}

                        <ReassignModal/>
                        <CompleteModal/>
                        <SuspendModal/>

                    </div>
                </section>
            </Fragment>
        )
    }
}

SearchActivity.propTypes = {
    session: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    setCardView: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired,
    activityName: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setNewBread: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
    toggleErr: PropTypes.func.isRequired,
    showComplete: PropTypes.func.isRequired,
    showSuspend: PropTypes.func.isRequired,
    getDetailsWorkflow: PropTypes.func.isRequired,
    setRecordStore: PropTypes.func.isRequired,
    setListActivity: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    session: state.session,
    activity: state.activity,

})
export default connect(mapStateToProps,
    {
        setActivePage,
        setCardView,
        activityName,
        activityUri,
        getDetails,
        setShowFab,
        setNewBread,
        // setPageTitle,
        setWizardPage,
        toggleErr,
        showComplete,
        showSuspend,
        getDetailsWorkflow,
        setRecordStore,
        setListActivity



    })(SearchActivity)

