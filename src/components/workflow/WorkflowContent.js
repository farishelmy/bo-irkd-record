import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
 

// import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setSelWorkFlow, setShowFab, getDetails, setWorkflowName, panelContent } from '../../actions/workflowAction'
import { setRecordStore, setListActivity } from '../../actions/workflowAction'
// import { setNewBread } from '../../actions/breadcrumbAction'

// import Fab from '../fab/FabWorkflow'
// import Search from '../modal/ModalWorkflow'
import WorkflowPanel from '../workflow/WorkflowPanel'
import PanelDropdown from '../workflow/PanelDropdown'
import ActivityPanel from '../workflow/ActivityPanel'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'
import 'rc-tooltip/assets/bootstrap.css'


class WorkflowContent extends Component {

    constructor() {
        super()  
        this.state = {
            title:null,

        }  
    }     

    componentDidUpdate(prevProps){
        if(prevProps.activity.activityStatus !== this.props.activity.activityStatus){
            const {activityStatus, titleActivitySel} = this.props.activity
            // const temp = activityDet.map(item => item.iconCls).toString()            
            // console.log(temp)            
                
            if (titleActivitySel === "Activity Started"){
                const titleValue = "Activity Started"
                this.setState({
                    title:titleValue
                })
            }
                
            if (titleActivitySel === "Activity Not Ready To Start"){
                const titleValue = "Activity Not Ready To Start"
                this.setState({
                    title:titleValue
                })
            }

            if (titleActivitySel === "Activity Overdue"){
                const titleValue = "Activity Overdue"
                this.setState({
                    title:titleValue
                })
            }

            if (titleActivitySel === "Activity Complete"){
                const titleValue = "Activity Complete"
                this.setState({
                    title:titleValue
                })
            }

            if (titleActivitySel === "Activity Suspend"){
                const titleValue = "Activity Suspend"
                this.setState({
                    title:titleValue
                })
            }
        }

    }

    //Direct Page To WorkFlow Detail
    setActivePage = (FabRec) => {

        const { user: { _id: bId } } = this.props.session
        const { wrkflSel, workflowTemplate, workflowName } = this.props.workflow

        // this.props.setPageSubject(workflowTemplate)
        this.props.setShowFab(false)
        this.props.setActivePage(FabRec)

        //Activity Wizard
        const workflowDet = {
            _action: 'SEARCHACTIVITY',
            workflowUri: wrkflSel,
            _id: bId,
        }

        this.props.setListActivity(workflowDet)

        //Record Wizard    
        const recordDet = {
            _id: bId,
            _action: "SEARCHRECORD",
            jsonQuery: JSON.stringify([{ "op": "EQUALS", "field": "%26%26Related+Records+of+Workflow", "value1": workflowName }]),
            searchOrder: "0"
        }
        // console.log(recordDet)
        this.props.setRecordStore(recordDet)

        //Breadcrumb
        // this.props.setNewBread(false, {
        //     id: wrkflSel,
        //     label: workflowName,
        //     activePage: 'viewWorkflow',
        //     isActive: true,
        // })
    }    

    render() {

        const { cardView, showFab, workflowDetails, panelContent } = this.props.workflow        
        const { title } = this.state
        
        

        return (
            <Fragment>

                {/* <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <Breadcrumb />
                    </div>
                </div> */}

                <section  className="forms">
                    <div className="container-fluid">     

                   
                        <header>
                            <div className="d-flex bd-highlight">
                                <h1 className="h3 display p-2 flex-grow-1 bd-highlight"><strong>{panelContent===true?'Workflow':title}</strong></h1>                      
                                <div className="p-2 bd-highlight col-md-5"><PanelDropdown/></div> 
                            </div>            
                        </header>   
                        
                  

                        <div className="row">
                            {/* <div className="col-lg-3">
                                <SidePanel/>  
                            </div> */}

                            <div className="col-lg-12">    
                                { 
                                    panelContent === true?
                                        <WorkflowPanel/>
                                    :
                                        <ActivityPanel/>
                                }    
                            </div>                          
                        </div>
                    </div>
                </section>
                   
            </Fragment>
        )
    }
}

WorkflowContent.propTypes = {
    session: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    getDetails: PropTypes.func.isRequired,
    setSelWorkFlow: PropTypes.func.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setRecordStore: PropTypes.func.isRequired,
    setListActivity: PropTypes.func.isRequired,
    // setNewBread: PropTypes.func.isRequired,
    panelContent: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    session: state.session,
    workflow: state.workflow,
    activity: state.activity

})
export default connect(mapStateToProps,
    {
        setActivePage,
        setSelWorkFlow,
        setShowFab,
        setListActivity,
        getDetails,
        // setNewBread,
        setRecordStore,
        // setPageTitle,
        setWorkflowName,
        panelContent

    })(WorkflowContent)

