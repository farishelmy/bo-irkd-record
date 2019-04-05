
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction'
import { setCardView, setSelWorkFlow, setShowFab, getDetails, setWorkflowName } from '../../actions/workflowAction'
import { setRecordStore, setListActivity, setWizardPage } from '../../actions/workflowAction'
// import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabWorkflowContent'
import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'
import 'rc-tooltip/assets/bootstrap.css'


class WorkflowPanel extends Component {

    constructor() {
        super()
        this.state = {
            workflow: [],

        }

    }     

    componentDidUpdate(prevProps){
        if(prevProps.workflow.workflowDetails !== this.props.workflow.workflowDetails){
            const { workflowDetails } = this.props.workflow  
            console.log(workflowDetails)
            this.setState({
                workflow: workflowDetails
            })
        }

    }
    
    componentWillMount(){
        const { workflowDetails } = this.props.workflow       
        this.setState({
            workflow: workflowDetails
        })
    }  

    render() {
         
        const { workflow } = this.state
        // console.log(workflow)

        return (
            <Fragment>

            {workflow.map((item,idx) =>   
               
                <div key={idx} className="card" onClick={this.markOnSel}>
                        <div className="card-header">                        
                            <h3 className="card-title">{item.workflowName}</h3>                             
                        </div>
                        <div className="card-body">    
                            <div className="media">
                            <span style={{backgroundImage: `url(${require('../../img/'+item.iconCls+'.svg')})` }} className="img-card mr-3"></span>
                                <div className="media-body">     
                                    <p className="text-muted mb-0"><label className="text-body">Supervisor:</label> {item.supervisor}</p>
                                    <p className="text-muted mb-0"><label className="text-body">Priority:</label> {item.priority}</p>   
                                    <p className="text-muted mb-0"><label className="text-body">Date Start:</label> {item.dateStart}</p>    
                                    <p className="text-muted mb-0"><label className="text-body">Date Due:</label> {item.dateDue}</p>   

                                    {/*  
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Assign</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/assign.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>  
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Complete</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/complete.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>  
                                    <Tooltip   
                                        placement="top"                         
                                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Activity</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <img src={require('../../img/activity.svg')} alt="Edit Details" data-pagename="edit" className='img-icon mr-3' onClick={this.updDetail}/>
                                    </Tooltip>                                                   */}
                                    
                                    
                                    
                                    </div>
                                    
                                </div>                           
                        </div>                                      
                </div> 

            )}    

   
            <Fab/>

           
            </Fragment>
        )
    }
}

WorkflowPanel.propTypes = {
    session: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
    setCardView: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
    setSelWorkFlow: PropTypes.func.isRequired,
    setWorkflowName: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setRecordStore: PropTypes.func.isRequired,
    setListActivity: PropTypes.func.isRequired,
    // setNewBread: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    session: state.session,
    workflow: state.workflow,

})
export default connect(mapStateToProps,
    {
        setActivePage,
        setCardView,
        setSelWorkFlow,
        setShowFab,
        setListActivity,
        getDetails,
        // setNewBread,
        setRecordStore,
        // setPageTitle,
        setWorkflowName,
        setWizardPage,

    })(WorkflowPanel)