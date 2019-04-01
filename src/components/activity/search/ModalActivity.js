import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { toggleSearchActivity, populateActivity } from '../../../actions/activityAction'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, } from 'reactstrap'


class ModalActivity extends Component {
  constructor() {
    super()
    this.state = {     
      ActivityName: null,
      WorkflowName: null,
      assignedTo: null,
      supervisor: null,
      escalatedTo: null,
      DateDueStart: null,
      DateDueEnd: null,
      DateStartedStart: null,
      DateStartedEnd: null,
      DateCompletedStart: null,
      DateCompletedEnd: null,
      ActivityNotStart: false,
      CompletedActivity: false,
      stakehList: [],


    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.locType!==this.props.location.locType){
      const { locType } = this.props.location      
      const stakehOptions = locType.map(itm => ({
        value: itm.uri,
        label: itm.Name
      }));
      this.setState({     
        stakehList: stakehOptions
      });
    } 
  }

  toggle = () => {
    const { showSearchModal } = this.props.activity
    this.props.toggleSearchActivity(!showSearchModal)
  }

  //Workflow Name
  handleChange = (e) => {
    const inputName = e.target.getAttribute('name')
    const inputVal = e.target.value
    // ===""?e.target.value=null:e.target.value  
    // console.log(e.target.value)    

    this.setState({
      [inputName]: inputVal
    })
    //  console.log(inputName)   
    //  console.log(inputVal)
  }

  handleAssignedTo = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ assignedTo: param.label });
    // console.log(param)
  };

  handleSupervisor = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ assignedTo: param.label });
    // console.log(param)
  }

  handleEscalatedTo = param => {
    // const inputName = e.target.getAttribute('name')
    this.setState({ escalatedTo: param.label });
    // console.log(param)
  };

  //DATE DUE 
  handleDateDueStart = (DateDueStart) => this.handleChangeDue({ DateDueStart })

  handleDateDueEnd = (DateDueEnd) => this.handleChangeDue({ DateDueEnd })

  handleChangeDue = ({ DateDueStart, DateDueEnd }) => {
    DateDueStart = DateDueStart || this.state.DateDueStart
    DateDueEnd = DateDueEnd || this.state.DateDueEnd

    if (DateDueStart.isAfter(DateDueEnd)) {
      DateDueEnd = DateDueStart
    }

    this.setState({ DateDueStart, DateDueEnd })
  }

  // DATE STARTED
  handleDateStartedStart = (DateStartedStart) => this.handleChangeStarted({ DateStartedStart })

  handleDateStartedEnd = (DateStartedEnd) => this.handleChangeStarted({ DateStartedEnd })

  handleChangeStarted = ({ DateStartedStart, DateStartedEnd }) => {
    DateStartedStart = DateStartedStart || this.state.DateStartedStart
    DateStartedEnd = DateStartedEnd || this.state.DateStartedEnd

    if (DateStartedStart.isAfter(DateStartedEnd)) {
      DateStartedEnd = DateStartedStart
    }

    this.setState({ DateStartedStart, DateStartedEnd })
  }

  // DATE COMPLETED
  handleDateCompletedStart = (DateCompletedStart) => this.handleChangeCompleted({ DateCompletedStart })

  handleDateCompletedEnd = (DateCompletedEnd) => this.handleChangeCompleted({ DateCompletedEnd })

  handleChangeCompleted = ({ DateCompletedStart, DateCompletedEnd }) => {
    DateCompletedStart = DateCompletedStart || this.state.DateCompletedStart
    DateCompletedEnd = DateCompletedEnd || this.state.DateCompletedEnd

    if (DateCompletedStart.isAfter(DateCompletedEnd)) {
      DateCompletedEnd = DateCompletedStart
    }

    this.setState({ DateCompletedStart, DateCompletedEnd })
  }

  //CheckBox
  handleChange=(event)=>{
    // e.preventDefault()
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name    
            
    this.setState({
        [name]:value
    })  
    // console.log(input)  
    // console.log(value)
  }  

  //Form Submit
  formSubmit = (e) => {
    e.preventDefault()
    const { ActivityName, WorkflowName, assignedTo, supervisor, escalatedTo, ActivityNotStart, CompletedActivity, DateDueStart, DateDueEnd, DateStartedStart, DateStartedEnd, DateCompletedStart, DateCompletedEnd } = this.state       
    const { user: { _id: bId } } = this.props.session

    const param ={
      _action: "SEARCHACTIVITY",
      activityName: ActivityName!==null?ActivityName:null,
      workflowName: WorkflowName!==null?WorkflowName:null,
      assignedTo: assignedTo!==null?assignedTo:null,
      supervisor: supervisor!==null?supervisor:null,
      escalatedTo: escalatedTo!==null?escalatedTo:null,
      dueDateFrom: DateDueStart!==null?moment(DateDueStart).format("DD/MM/YYYY"):null,
      dueDateTo: DateDueEnd!==null?moment(DateDueEnd).format("DD/MM/YYYY"):null,
      startDateFrom: DateStartedStart!==null?moment(DateStartedStart).format("DD/MM/YYYY"):null,
      startDateTo: DateStartedEnd!==null?moment(DateStartedEnd).format("DD/MM/YYYY"):null,
      completeDateFrom: DateCompletedStart!==null?moment(DateCompletedStart).format("DD/MM/YYYY"):null,
      completeDateTo: DateCompletedEnd!==null?moment(DateCompletedEnd).format("DD/MM/YYYY"):null,
      excludeActivityNotStart: ActivityNotStart,
      excludeCompletedActivity: CompletedActivity,
      _id: bId
    }
    this.props.populateActivity(param)
    // console.log(param)
    this.props.toggleSearchActivity(false)    

  }

  render() {
    const { showSearchModal } = this.props.activity
    const { ActivityNotStart, CompletedActivity, stakehList} = this.state


    return (
      <div>
        <Modal isOpen={showSearchModal} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Search Activity</ModalHeader>
            <ModalBody>

              <Row> 
                <Col md={6}>        
                  <FormGroup>
                    <label>Activity Name</label>
                      <input name="ActivityName" type="text" className="form-control" placeholder="Activity Name" onChange={this.handleChange} />
                  </FormGroup>
                </Col>
               

                <Col md={6}>        
                  <FormGroup>
                    <label>Workflow Name</label>
                      <input name="WorkflowName" type="text" className="form-control" placeholder="Workflow Name" onChange={this.handleChange} />
                  </FormGroup>
                </Col>               
              </Row> 


              <Row> 
                <Col md={6}>     
                  <FormGroup>
                    <label>Assigned To</label>
                      <Select
                        name="assignedTo"
                        options={stakehList}
                        onChange={this.handleAssignedTo}
                        className="basic-multi-select"
                        placeholder="Name"
                        isClearable
                      />
                  </FormGroup>
                </Col>               


                <Col md={6}>  
                <FormGroup>
                  <label>Supervisor</label>
                    <Select
                      name="supervisor"
                      options={stakehList}
                      onChange={this.handleSupervisor}
                      className="basic-multi-select"
                      placeholder="Name"
                      isClearable
                    />
                </FormGroup>
                </Col>               
              </Row> 


              <FormGroup>
                <label>Escalated To</label>
                  <Select
                    name="escalatedTo"
                    options={stakehList}
                    onChange={this.handleEscalatedTo}
                    className="basic-multi-select"
                    placeholder="Name"
                    isClearable
                  />
              </FormGroup>
              

               {/* Date Due */}
              <Row>          
                <Col md={6}>
                  <FormGroup>
                    <label>Date Due Start</label>
                      <DatePicker
                          placeholder="Date Start"
                          selected={this.state.DateDueStart}
                          selectsStart
                          startDate={this.state.DateDueStart}
                          endDate={this.state.DateDueEnd}
                          onChange={this.handleDateDueStart}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"                             
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"                                                             
                      />
                  </FormGroup>
                </Col>

                  <Col md={6}>
                    <FormGroup>
                      <label>Date Due End</label>
                        <DatePicker
                          placeholder="Date End"
                          selected={this.state.DateDueEnd}
                          selectsEnd
                          startDate={this.state.DateDueStart}
                          endDate={this.state.DateDueEnd}
                          onChange={this.handleDateDueEnd}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"  
                          todayButton={"Today"}  
                        />
                    </FormGroup>
                  </Col>
                </Row>                

                {/* DATE STARTED */}
                <Row>          
                  <Col md={6}>
                    <FormGroup>
                      <label>Date Started Start</label>
                        <DatePicker
                            placeholder="Date Start"
                            selected={this.state.DateStartedStart}
                            selectsStart
                            startDate={this.state.DateStartedStart}
                            endDate={this.state.DateStartedEnd}
                            onChange={this.handleDateStartedStart}
                            className="form-control"
                            dateFormat="DD/MM/YYYY"                            
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"                              
                        />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <label>Date Started End</label>
                        <DatePicker
                          placeholder="Date End"
                          selected={this.state.DateStartedEnd}
                          selectsEnd
                          startDate={this.state.DateStartedStart}
                          endDate={this.state.DateStartedEnd}
                          onChange={this.handleDateStartedEnd}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"                          
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"                          
                        />
                    </FormGroup>
                  </Col>
                </Row>

                {/* DATE COMPLETED */}
                <Row>          
                  <Col md={6}>
                    <FormGroup>
                      <label>Date Completed Start</label>
                        <DatePicker
                            placeholder="Date Start"
                            selected={this.state.DateCompletedStart}
                            selectsStart
                            startDate={this.state.DateCompletedStart}
                            endDate={this.state.DateCompletedEnd}
                            onChange={this.handleDateCompletedStart}
                            className="form-control"
                            dateFormat="DD/MM/YYYY"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" 
                            todayButton={"Today"}  
                        />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <label>Date Completed End</label>
                        <DatePicker
                          placeholder="Date End"
                          selected={this.state.DateCompletedEnd}
                          selectsEnd
                          startDate={this.state.DateCompletedStart}
                          endDate={this.state.DateCompletedEnd}
                          onChange={this.handleDateCompletedEnd}
                          className="form-control"
                          dateFormat="DD/MM/YYYY"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select" 
                          todayButton={"Today"}  
                        />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>  
                  <Col md={6}>        
                    <FormGroup>      
                      <label>
                        <input name="ActivityNotStart" type="checkbox" onChange={this.handleChange} checked={ActivityNotStart} />  Activity Not Ready to Start                        
                      </label>
                    </FormGroup>
                  </Col>
               
                  <Col md={6}>       
                    <FormGroup>    
                      <label>
                        <input name="CompletedActivity" type="checkbox" onChange={this.handleChange} checked={CompletedActivity} /> Activity Complete                        
                      </label>
                    </FormGroup>    
                  </Col>            
                </Row>            

              </ModalBody>
            <ModalFooter>



              <Button type="submit" color="primary">Search</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>

    )
  }
}
ModalActivity.propTypes = {
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  toggleSearchActivity: PropTypes.func.isRequired,  
  populateActivity: PropTypes.func.isRequired,


}
const mapStateToProps = (state) => ({
  activity: state.activity,
  session: state.session,
  location:state.location

})
export default connect(mapStateToProps,
  {
    toggleSearchActivity,
    populateActivity,
  })
  (ModalActivity)


