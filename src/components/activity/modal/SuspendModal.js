import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { suspendActivity, showSuspend, setShowFab } from '../../../actions/activityAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Col, Row, Label } from 'reactstrap'


class SuspendModal extends Component {
    constructor() {
        super()
        this.state = {
            resultOptions: [],
            reason:null,
            day:null,
            hour:null,
            minute:null,     
        }
    }   

    toggle = () => {
        const { showSuspend } = this.props.activity
        this.props.showSuspend(!showSuspend)
    }   

    handleChange = (e) => {
        const inputName = e.target.getAttribute('name')
        const inputVal = e.target.value
         
        this.setState({
            [inputName]: inputVal
        })
        // console.log(inputName)   
        // console.log(inputVal)

    }

    //form
    formSuspend = (e) => {
        e.preventDefault()
        const { day, hour, minute, reason } = this.state
        const { activityUri } = this.props.activity     
        const { user: { _id: bId } } = this.props.session
        const total = (day*86400)+(hour*3600)+(minute*60)
       
    
        const param = {
            _action: "SUSPENDACTIVITY",
            _activityUri: activityUri, 
            reason: reason,
            totalDuration:  total,         
            _id: bId,
        }
        //   console.log(param)
        this.props.suspendActivity(param)
        this.props.showSuspend(false)
        this.props.updList()
        this.props.setShowFab(false)
    

    }

    render() {
        const { activityName, showSuspend }=this.props.activity   
       
        return (
        <div>
            <Modal isOpen={showSuspend} toggle={this.toggle} className={this.props.className}>
             

                <Form onSubmit={this.formSuspend}>
                    <ModalHeader toggle={this.toggle}>Suspend Activity - {activityName} </ModalHeader>
                    <ModalBody> 
                        <FormGroup>
                            <label>Reason for suspension:</label>
                            <Input type="textarea" name="reason" onChange={this.handleChange} />                        
                        </FormGroup>

                        <FormGroup>
                            <label>Duration of suspension:</label>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>                                    
                                    <Input type="number" name="day" placeholder="Day" onChange={this.handleChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>                                   
                                    <Input type="number" name="hour" max="24" min="0" placeholder="Hour" onChange={this.handleChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>                                  
                                    <Input type="number" name="minute" max="59" min="0" placeholder="Minute" onChange={this.handleChange}/>
                                    </FormGroup>  
                                </Col>
                            </Row>                        
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Form>

            
            </Modal>
        </div>

        )
    }
}
SuspendModal.propTypes = {
  activity: PropTypes.object.isRequired,   
  suspendActivity: PropTypes.func.isRequired,
  showSuspend: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
   

}
const mapStateToProps = (state) => ({
  activity: state.activity,
  session: state.session,
 

})
export default connect(mapStateToProps,
  {
    suspendActivity,
    showSuspend,
    setShowFab
  })
(SuspendModal)


