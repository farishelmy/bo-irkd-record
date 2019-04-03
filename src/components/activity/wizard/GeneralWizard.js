import React, { Component,Fragment } from 'react' 
 
import Select from 'react-select'
// import moment from 'moment-duration-format'
import moment from 'moment'
 
import { Button } from 'reactstrap'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class GeneralWizard extends Component {
    constructor(){
        super()
        this.state={
            activityName:null,
            activityUri:null,
            markOnSel:null,
            workflowName:null,
            assignedTo:null,
            activityDateDue:null,
            icon:null,
            supervisor:null,
            priority:null,
            stakehList:[],
            day:null,
            hour:null,
            minute:null, 
            priorityOption:[
                {value: "Very High" ,label: "Very High" },
                {value: "High" ,label: "High"},
                {value: "Medium" , label: "Medium"},
                {value:  "Low" ,label: "Low"},  
                {value: "Very Low" ,label: "Very Low"}                
            ],               
        }     
    }   
    
    componentWillMount(){
        const {activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration} = this.props.item
        const { locType}=this.props.location   
        const stakehOptions = locType.map(itm=>({ value: itm.uri, label:itm.Name}))
        const priorityVal = ({value: priority, label: priority})
        const assignedToVal = ({value: assignedTo, label: assignedTo})
        const supervisorVal = ({value: supervisor, label: supervisor})
        const day = Math.trunc(estDuration/86400)
        const hour = moment.utc(estDuration*1000).format("h")
        const minute = moment.utc(estDuration*1000).format("mm")

      this.setState({
        activityName:activityName,
        activityUri:activityUri,        
        workflowName:workflowName,
        assignedTo:assignedToVal,
        activityDateDue:activityDateDue,
        icon:icon,
        supervisor:supervisorVal,
        priority:priorityVal,
        day:day,
        hour:hour,
        minute:minute,
        stakehList:stakehOptions,
      })
    }    

    handleChange=(e)=>{
      const inputName = e.target.getAttribute('name')
      const inputVal =  e.target.value
      // ===""?e.target.value=null:e.target.value  
      // console.log(e.target.value)    
  
    this.setState({
        [inputName]:inputVal
      })  
    //    console.log(inputName)   
    //    console.log(inputVal)
    }   
    
    handleAssignTo=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({assignedTo:param})
        // console.log(param)
    }

    handleSupervisor=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({supervisor:param})
        // console.log(param)
    }

    handlePriority=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({priority:param})
        // console.log(param)
    }

    formSuspend = (e) => {
        e.preventDefault()
        const { day, hour, minute,  } = this.state      
        const total = (day*86400)+(hour*3600)+(minute*60)
       
        console.log(total)
    
        
        
    

    }

    
  render() {

    const { activityName,activityUri,workflowName,assignedTo,activityDateDue,icon,supervisor,priority,estDuration,stakehList,priorityOption,day,hour,minute } = this.state
    // console.log(assignedTo)
     
   
    
    
    return (
        <Fragment>
        <h1 className="h3 display text-primary text-center">General</h1>
            <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-2 col-lg-3 col-md-3">
                        <div className="text-center mt-5">
                            <img src={require('../../../img/management.svg')} alt="management" className=" img-dash" />
                        </div>
                    </div>  
                   
                    <div className="col-xl-10 col-lg-9 col-md-9 col-sm-2">
                        <div className="form-group">
                            <label>Activity Name</label>
                                <input type="text" name="activityName" className="form-control" placeholder="Name" onChange={this.handleChange} value={activityName} />
                        </div>
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <label>Assigned To</label>
                                <Select 
                                    name="assignedTo"
                                    options={stakehList}
                                    onChange={this.handleAssignTo}
                                    value={assignedTo===""?null:assignedTo} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>
                            <div className="col-sm-4 form-group">
                                <label>Supervisor</label>
                                <Select 
                                    name="supervisor"
                                    options={stakehList}
                                    onChange={this.handleSupervisor}
                                    value={supervisor===""?null:supervisor} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>                           
                            <div className="col-sm-4 form-group">
                                <label>Priority</label>
                                <Select 
                                    name="priority"
                                    options={priorityOption}
                                    onChange={this.handlePriority}
                                    value={priority===""?null:priority} 
                                    placeholder="Name"
                                    isClearable
                                /> 
                            </div>                            
                        </div>
                        <div className="form-group">
                            <label>Estimate</label>
                            <div className="row">                       
                                <div className="col-sm-4 form-group">
                                    <input name="day" type="number" name="day" className="form-control" placeholder="Day" onChange={this.handleChange} value={day}/> 
                                </div>
                                <div className="col-sm-4 form-group">
                                    <input name="hour" type="number" name="hour" max="24" min="0" className="form-control" placeholder="Hour" onChange={this.handleChange} value={hour }/> 
                                </div>
                                <div className="col-sm-4 form-group">
                                    <input name="minute" type="number" name="minute" max="59" min="0" className="form-control" placeholder="Minute" onChange={this.handleChange} value={minute }/> 
                                </div>
                            </div>                                     
                        </div> 
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Save</button>                   
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>
            </form>                
      </Fragment>
    )
  }
}
GeneralWizard.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,      
    workflow: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    
}

const mapStateToProps= state =>({
        session:state.session,
        layout:state.layout,
        location:state.location,
        workflow:state.workflow,
        
})
    
export default connect(mapStateToProps, 
    {
        

    })(GeneralWizard)