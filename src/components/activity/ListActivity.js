import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from '../../actions/layoutInitAction' 
import { getDetails, activityUri, activityName, setCardView, setShowFab, setWizardPage, checkResult, getResult, setListActDue } from '../../actions/activityAction'
import { toggleErr, showComplete, showSuspend } from '../../actions/activityAction'
// import { setNewBread} from '../../actions/breadcrumbAction'

import Pagination from 'rc-pagination'
import Tooltip from 'rc-tooltip'
import update from 'immutability-helper' 

import CardView from './CardView'
import ListView from './ListView'
import Fab from '../../components/fab/FabActivity'
import ReassignModal from '../activity/modal/ReassignModal'
import CompleteModal from '../activity/modal/CompleteModal'
import SuspendModal from '../activity/modal/SuspendModal'


import 'rc-pagination/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'


class ListActivity extends Component {

    constructor(){
        super()
        this.state={
            listAct:[],
            current:1,
        }
    
    }


    componentDidUpdate(prevProps){
        if(prevProps.activity.listActivityDue!==this.props.activity.listActivityDue){
            const {listActivityDue}=this.props.activity  
            // console.log(listActivityDue)
            const act= listActivityDue.map(res=>({...res,isSel:false}))
            //  console.log(listWkflw)
            this.setState({
                listAct:act
            })
        }          
    }

    //Direct Page To WorkFlow Detail
    setActivePage=(page)=>{         
        
        const {user:{_id:bId}}=this.props.session
        const {activityName, listActivityDue, activityUri, checkResult }=this.props.activity      
         
        if (page === 'wizardActivity'){

            // console.log(page)          

            // this.props.setPageSubject(workflowTemplate)
            this.props.setActivePage(page)
            this.props.setWizardPage("general") 
            this.props.setShowFab(false)      

            //Breadcrumb
            // this.props.setNewBread(false,{
            //     id: 'viewAct', 
            //     label: activityName, 
            //     activePage: 'viewAct', 
            //     isActive: true,
            // })  
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
         

    }


    //Selection
    markOnSel=(activityName,activityUri,markOnSel,workflowName,assignedTo,activityDateDue,icon,isSel,supervisor,priority,estDuration)=>{        
        const {user:{_id:bId}}=this.props.session
         
        const val = [{activityName,activityUri,markOnSel,workflowName,assignedTo,activityDateDue,icon,isSel,supervisor,priority,estDuration}]

        this.props.getDetails(val) //Set Workflow Details
        this.props.activityUri(activityUri)  //Set Workflow Uri
        this.props.activityName(activityName)  //Set Workflow Name

        const param = {
            _action: "CHECKRESULT",
            _activityUri: activityUri,
            _id: bId
        }
        this.props.checkResult(param)
    

        const {listAct} = this.state
        // console.log(listAct)
        const itmIdx = listAct.findIndex(itm=>itm.activityUri === activityUri)
        const desIdx = listAct.findIndex(itm=>itm.isSel===true)

        const newWrkfwList = desIdx === -1?
        update(listAct,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(listAct,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })  
        // // select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
            this.props.activityUri(null) 
                      
         
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            listAct: newWrkfwList 
            
        })
    }


      
    //Delete Btn
    delBtn=()=>{
        // const {wrkflowSelect} = this.state
        const {user:{_id:bId}} = this.props.session  
        const {wrkflSel, listActivityDue}=this.props.activity 
        alert("Successful Deleted")
    } 

     

    //Change view Card and List
    changeToViewCard=(e)=>{
        const{cardView}=this.props.activity
        this.props.setCardView(!cardView)
    }     

    onChangePaging = (page) => {
        const { user: { _id: bId }} = this.props.session
        const { pageSize } = this.props.activity
    
        const param = {           
          _action: 'LISTACTDUE',
          page: page,
          start: (page-1)*pageSize,
          _id: bId
        }
      
        this.props.setListActDue(param)
    
        this.setState({
          current: page,
        })
      }

  render() {

    const{ cardView, showFab, pageSize, totalCount }=this.props.activity  
     
    const{ listAct, current }=this.state
    // console.log(listAct)
    
    const rec = listAct.map(itm=>cardView?
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
        /> :
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
        )
       
    return (
      <Fragment>  

        {/* <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div> */}
    
      <section className="forms">
          <div className="container-fluid">
          <header>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h1 className="h3 display"><strong>List of Activity</strong></h1>  
                
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
                        <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>

                    </button>

                    </Tooltip> */}
                </div>

            </div>

                    

        </header>
        
        <div className="row">
           {cardView===false?<div className="row">
            <div className="col-12">                
                <div className="d-flex justify-content-between align-items-center">
                <div className="p-2 img-fluid img-scale"/>
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
            </div>:rec}
        </div> 

        {showFab?<Fab 
        FabRec={this.setActivePage}
        reasgnBtn={this.reassignBtn}
        delBtn={this.delBtn}
        />:''}

        <ReassignModal/>
        <CompleteModal/>
        <SuspendModal/>


        <div className="modal-footer justify-content-center">
            <Pagination onChange={this.onChangePaging} current={current}  pageSize={pageSize} total={totalCount} />    
        </div>

</div>
</section>
</Fragment>  
    )
  }
}

ListActivity.propTypes={
    session: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setCardView:PropTypes.func.isRequired,
    // setSelWorkFlow:PropTypes.func.isRequired,
    setShowFab:PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,   
    // setDelBtn:PropTypes.func.isRequired,
    // setPageTitle:PropTypes.func.isRequired,    
    // setNewBread: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired,
    activityName: PropTypes.func.isRequired,
    setWizardPage: PropTypes.func.isRequired,
    toggleErr: PropTypes.func.isRequired,
    showComplete: PropTypes.func.isRequired,
    checkResult: PropTypes.func.isRequired,
    getResult: PropTypes.func.isRequired,
    setListActDue: PropTypes.func.isRequired,
    showSuspend: PropTypes.func.isRequired,
    
}
const mapStateToProps= state =>({
    session: state.session,
    activity: state.activity,    
     
})
export default connect(mapStateToProps,
{
    setActivePage,
    setCardView,    
    setShowFab,     
    getDetails, 
    // setNewBread,     
    // setDelBtn, 
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
    showSuspend

})(ListActivity)

