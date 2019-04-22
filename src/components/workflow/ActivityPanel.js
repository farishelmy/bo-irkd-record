import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setActivePage } from '../../actions/layoutInitAction'  
import { activityUri, activityName, setShowFab, getDetails, checkResult } from '../../actions/activityAction'
// import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from '../fab/FabActivityContent' 
import CardPanel from '../workflow/AcivityCardPanel'

import Tooltip from 'rc-tooltip'
import update from 'immutability-helper'

import 'rc-tooltip/assets/bootstrap.css'


class ActivityPanel extends Component {

    constructor() {
        super()
        this.state = {          
            Activity:[]
        }

    }     

    componentDidUpdate(prevProps){
        if(prevProps.activity.activityStatus !== this.props.activity.activityStatus){           
            const {activityStatus}=this.props.activity 
            const act= activityStatus.map(res=>({...res,isSel:false}))  
            // console.log(act)
            this.setState({
                Activity:act
            })
        }  
        if(prevProps.activity.listActivity !== this.props.activity.listActivity){
            const { listActivity } = this.props.activity  
            // console.log(listActivity)
            this.setState({
                Activity: listActivity,
            })

        }
        
    }

    //Selection
    markOnSel=(workflowName, activityUri, activityName, assignedTo, priority, dateStart, dateDue, iconCls, supervisor, isSel)=>{   

        const { user: { _id: bId }} = this.props.session      

        const val = [{workflowName, activityUri, activityName, assignedTo, priority, dateStart, dateDue, iconCls, supervisor, isSel}]

        this.props.getDetails(val) //Set activity details
        this.props.activityUri(activityUri)  //Set Workflow Uri
        this.props.activityName(activityName)  //Set Workflow Name

        
        const param = {
            _action: "CHECKRESULT",
            _activityUri: activityUri,
            _id: bId
        }
        this.props.checkResult(param)

        const {Activity} = this.state
        // console.log(listAct)
        const itmIdx = Activity.findIndex(itm=>itm.activityUri === activityUri)
        const desIdx = Activity.findIndex(itm=>itm.isSel===true)

        const newList = desIdx === -1?
        update(Activity,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(Activity,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })  
        // // select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
            this.props.activityUri(null) 
            this.props.activityName(null)
                      
         
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            Activity: newList 
            
        })
    }

    render() {
         
        const { Activity } = this.state
        const { showFab } = this.props.activity
         
         
        return (
            <Fragment>

                {Activity.length !== 0? Activity.map((item,idx) =>  
               
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

                    ) 
                : 
                    <strong>There is no activity.</strong>
                } 

                {
                    showFab?<Fab/>:""
                }

          
            </Fragment>
        )
    }
}

ActivityPanel.propTypes = {
    session: PropTypes.object.isRequired,
    activity: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
    getDetails: PropTypes.func.isRequired, 
    setShowFab: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,   
    // setNewBread: PropTypes.func.isRequired,
    activityUri: PropTypes.func.isRequired, 
    activityName: PropTypes.func.isRequired,
    checkResult: PropTypes.func.isRequired,
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
        // setNewBread,      
        activityUri, 
        activityName,
        checkResult 

    })(ActivityPanel)

