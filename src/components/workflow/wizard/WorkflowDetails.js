import React, { Component,Fragment } from 'react'
import GeneralWizard from '../../workflow/wizard/GeneralWizard'
// import activityWizard from '../../workflow/wizard/ActivityWizard'
import recordWizard from '../../workflow/wizard/RecordWizard'
import FolTabHead from '../../workflow/wizard/TabWorkflowDet'
// import Breadcrumb from '../../layouts/Breadcrumb'

import {setWizardPage,setListActivity} from '../../../actions/workflowAction'
import {setShowFab} from '../../../actions/workflowAction'
 
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


class WorkflowDetails extends Component {

    handleWizard=(wizardName)=>{
    
        const {user:{_id:bId}}=this.props.session
        const {wrkflSel}=this.props.workflow

        this.props.setWizardPage(wizardName)
        this.props.setShowFab(false)

        
        
        // //Activity Detail
        // const workflowDet={
        //     _action:'SEARCHACTIVITY',         
        //     workflowUri:wrkflSel,
        //     _id:bId,               
        // } 
        // this.props.setListActivity(workflowDet)

    }    

     


render() {

    const {wizardPage, containerLine} = this.props.workflow
    const {wrkflSel, workflowDetails}=this.props.workflow    

    
    this.components={
        general:GeneralWizard,
        // activity:activityWizard,        
        record:recordWizard,
    }
    const DetailsWizard=this.components[wizardPage]

  return (
    
  <Fragment>
      {/* <div className="breadcrumb-holder">
            <div className="container-fluid">
              <Breadcrumb/>
            </div>
        </div>    */}
 
        {workflowDetails.map((item,idx) =>   

       <section key={idx} className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">{item.workflowName}</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wizardPage}
                                    isContainer={containerLine} 
                                />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <DetailsWizard                                     
                                    item={item}                                      
                                    active={wizardPage} 
                                />                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section> 
         ) } 
</Fragment>
  )
}
}

WorkflowDetails.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  setWizardPage: PropTypes.func.isRequired,
  workflow: PropTypes.object.isRequired,
  setListActivity: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,       
      workflow:state.workflow,
})
  
export default connect(mapStateToProps, { 
    setWizardPage,
    setListActivity,
    setShowFab

})(WorkflowDetails)