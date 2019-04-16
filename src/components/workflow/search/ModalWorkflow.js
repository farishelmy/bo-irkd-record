import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { toggleSearchWorkflow, populateWorkflow } from '../../../actions/workflowAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class ModalWorkflow extends Component {
  constructor() {
    super()
    this.state = {
      DateDueStart: null,
      DateDueEnd: null,
      DateStartedStart: null,
      DateStartedEnd: null,
      DateCompletedStart: null,
      DateCompletedEnd: null,
      WorkflowName: null,
      actionVal: [],


    }
  }
  // componentDidMount(){
  //     const {user:{bio_access_id:bId}}=this.props.session
  //     const {stakehList}=this.props.stakeh
  //     if(stakehList.length === 0){this.props.getStakehList({bio_access_id:bId,action:'ITEM_LIST'})}

  //     const {recordList}=this.props.record
  //     if(recordList.length === 0){this.props.getRecordList({bio_access_id:bId,action:'ITEM_LIST'})}

  //     const {actionTypes}=this.props.actionTy
  //     if(actionTypes.length === 0){this.props.getActionTypes({bio_access_id:bId,action:'ACTION_TYPES'})}
  // }
  // componentDidUpdate(prevProps){

  //     if (prevProps.stakeh.stakehList !== this.props.stakeh.stakehList) {
  //         // console.log('update')
  //         const {stakehList}=this.props.stakeh
  //         const stakeholder = stakehList.map(itm => ({ value: itm.stakeholder_id, label: itm.full_name, stakehType:itm.stakeh_type, stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
  //         this.setState({stakeh: stakeholder})

  //       }

  //     if (prevProps.record.recordList !== this.props.record.recordList) {
  //         // console.log('update')
  //         const {recordList}=this.props.record
  //         const record = recordList.map(itm => ({ value: itm.record_id, label: itm.title, recordNo:itm.record_no, recordType: itm.record_type}))
  //         this.setState({record: record})

  //       }

  //       if (prevProps.actionTy.actionTypes !== this.props.actionTy.actionTypes) {
  //         // console.log('update')

  //         const {actionTypes}=this.props.actionTy
  //         const actionTy = actionTypes.map(itm => ({ value: itm.id, label:itm.name}))
  //         this.setState({actionTy: actionTy})

  //       }

  // }

  toggle = () => {
    const { showSearchModal } = this.props.workflow
    this.props.toggleSearchWorkflow(!showSearchModal)
  }

  //Workflow Name
  handleChangeName = (e) => {
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




  formSubmit = (e) => {
    e.preventDefault()
    const { DateDueStart, DateDueEnd, DateStartedStart, DateStartedEnd, DateCompletedStart, DateCompletedEnd, WorkflowName } = this.state
    // console.log(DateDueStart)        
    const { user: { _id: bId } } = this.props.session

    this.props.toggleSearchWorkflow(false)
    this.props.populateWorkflow({
      workflowName: WorkflowName!==null?WorkflowName:null,
      dueDateFrom: DateDueStart!==null?moment(DateDueStart).format("DD/MM/YYYY"):null,
      dueDateTo: DateDueEnd!==null?moment(DateDueEnd).format("DD/MM/YYYY"):null,
      startDateFrom: DateStartedStart!==null?moment(DateStartedStart).format("DD/MM/YYYY"):null,
      startDateTo: DateStartedEnd!==null?moment(DateStartedEnd).format("DD/MM/YYYY"):null,
      completeDateFrom: DateCompletedStart!==null?moment(DateCompletedStart).format("DD/MM/YYYY"):null,
      completeDateTo: DateCompletedEnd!==null?moment(DateCompletedEnd).format("DD/MM/YYYY"):null,
      _action: "SEARCHWORKFLOW",
      _id: bId,
    })
  }

  render() {
    const { showSearchModal } = this.props.workflow

    return (
      <div>
        <Modal isOpen={showSearchModal} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Search Workflow</ModalHeader>
            <ModalBody>

              <FormGroup>
                <label>Workflow Name</label>
                <input name="WorkflowName" type="text" className="form-control" placeholder="Workflow Name" onChange={this.handleChangeName} />
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
                      todayButton={"Today"}
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
ModalWorkflow.propTypes = {
  workflow: PropTypes.object.isRequired,
  toggleSearchWorkflow: PropTypes.func.isRequired,
  populateWorkflow: PropTypes.func.isRequired,
   

}
const mapStateToProps = (state) => ({
  workflow: state.workflow,
  session: state.session,

})
export default connect(mapStateToProps,
  {
    toggleSearchWorkflow,
    populateWorkflow,
     
  })
  (ModalWorkflow)


