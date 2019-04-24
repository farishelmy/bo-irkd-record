import React, { Component, Fragment } from 'react'
import ListEscalation from './ListEscalation'
import {activityUri, setShowFab} from '../../../actions/activityAction'


import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import update from 'immutability-helper' 

 
class EscalationWizard extends Component {
    constructor(){
      super()    
      this.state={
        listActivity:[]      
      }       
    }  
    
//   componentWillMount(){
//     const {listActivity}=this.props.listActivity  
//     // console.log(listActivity)
//     const listAct = listActivity.map(res=>({...res,isSel:false}))
//     //  console.log(listAct)
//     this.setState({
//       listActivity:listAct
//     })
//   }
 


//   markOnSel=(activityUri,activityName,workflowName,assignedTo,activityDateDue,iconCls,supervisor,priority)=>{
        
//     const {user:{_id:bId}}=this.props.session   
    
//     const {listActivity} = this.state
//     // console.log({workList} )
//     const itmIdx = listActivity.findIndex(itm=>itm.activityUri === activityUri)
//     const desIdx = listActivity.findIndex(itm=>itm.isSel===true)

//     const newListAct = desIdx === -1?
//     update(listActivity,{
//       [itmIdx]:{isSel:{$set:true}}
//     })
//     :update(listActivity,{
//       [itmIdx]:{isSel:{$set:true}},
//       [desIdx]:{isSel:{$set:false}}
//     })  
//     // // select
//     if (itmIdx===desIdx){
//         this.props.setShowFab(false)
//         this.props.activityUri(null) 
                  
     
//     }
//     else{
//         this.props.setShowFab(true)
//     }

//     this.setState({
//       listActivity: newListAct 
        
//     })
//   }



  render() {
    // const {workflowName,isSel,workflowUri,supervisor,icon,dateStart,dateDue,jobNo,priority} = this.props.item
    // const {listActivity} = this.state
    // console.log(listActivity)
    
 

    

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Escalations</h1>
      <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
        {/* <div className="row justify-content-center mb-5"> */}
         

          <div className="row">
          <strong>There is no items to show in this view.</strong>
            {/* <div className="col-12">                
              <div className="d-flex justify-content-between align-items-center">
              <div className="p-2 img-fluid img-scale"/>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Escalate To</p>
                  </div>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Description</p>
                  </div>
                  <div className="col p-2">
                      <p className="card-title mb-1 font-weight-bold text-muted">Date to Escalate</p>
                  </div>                   
              </div>               
            </div>   */}
            
            {/* { listActivity.map(item=>
              <ListEscalation
                key={item.activityUri}
                activityUri={item.activityUri}
                activityName={item.activityName}
                workflowName={item.workflowName}
                assignedTo={item.assignedTo}
                activityDateDue={item.activityDateDue}
                iconCls={item.iconCls}
                supervisor={item.supervisor}
                priority={item.priority}  
                isSel={item.isSel}
                markOnSel={this.markOnSel}              
              />
            )} */}

            
  
          </div>
        {/* </div>    */}
     </form>
      </Fragment>
    )
  }
}

EscalationWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,      
  activity: PropTypes.object.isRequired, 
  activityUri: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
   
  
   
    
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,      
      activity:state.activity,
       
})
  
export default connect(mapStateToProps, {
    activityUri, 
    setShowFab
   
})(EscalationWizard)
