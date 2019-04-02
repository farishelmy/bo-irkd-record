import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { showComplete, completeActivity } from '../../../actions/activityAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class CompleteModal extends Component {
    constructor() {
        super()
        this.state = {
            resultOptions: [],
            result:[{
                value:null,
                label:null
            }],     
        }
    }    

    componentDidUpdate(prevProps){
        if(prevProps.activity.result !== this.props.activity.result){   
            const lab = this.props.activity.result.boxLabel             
            const val = this.props.activity.result.inputValue            
            const resultOpt = [{ value:val, label:lab}]
            this.setState({
                resultOptions:resultOpt,
            })
        }
    
        // if(prevProps.activity.activityDet !== this.props.activity.activityDet){
        //     const { activityDet } = this.props.activity
        //     const  assigned = activityDet.map(itm => ({label: itm.boxLabel, value: itm.inputValue }))       
        //     this.setState({
        //         assignee: assigned
        //     })
        // }

    } 
  
    toggle = () => {
        const { showComplete } = this.props.activity
        this.props.showComplete(!showComplete)
    }

    handleResult=(param)=>{    

        this.setState({
            result:param.value 
        })
        // console.log(param)
    }

    //complete with result
    formSubmit = (e) => {
        e.preventDefault()
        const { result } = this.state
        const { activityUri } = this.props.activity     
        const { user: { _id: bId } } = this.props.session
    
        const param = {
            _action: "SAVERESULTANDCOMPLETEACT",
            _activityUri: activityUri,
            rdResult: result,
            _id: bId,
        }
        //   console.log(param)
        this.props.completeActivity(param)
        this.props.showComplete(false)
    

    }

    //complete without result
    formComplete = (e) => {
        e.preventDefault()
        const { result } = this.state
        const { activityUri } = this.props.activity     
        const { user: { _id: bId } } = this.props.session
    
        const param = {
            _action: "COMPLETEACTIVITY",
            _activityUri: activityUri,            
            _id: bId,
        }
        //   console.log(param)
        this.props.completeActivity(param)
        this.props.showComplete(false)
    

    }

    render() {
        const { checkResult, activityName, showComplete }=this.props.activity   
        const { resultOptions } = this.state        
        // console.log(result.inputValue)


        return (
        <div>
            <Modal isOpen={showComplete} toggle={this.toggle} className={this.props.className}>
            { 
                checkResult===true?

                <Form onSubmit={this.formSubmit}>
                    <ModalHeader toggle={this.toggle}>Result</ModalHeader>
                    <ModalBody> 
                        <FormGroup>
                            <label>Please select one of the result:</label>
                            <Select 
                                name="result"
                                options={resultOptions}
                                onChange={this.handleResult}                     
                                placeholder="Result"
                                isClearable
                            /> 
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Form>

                :

                <Form onSubmit={this.formComplete}>
                    <ModalHeader toggle={this.toggle}>Complete Activity?</ModalHeader>
                    <ModalBody> 
                        <FormGroup>
                            <label>Are you sure to complete this <strong>{activityName}</strong> activity? </label>                            
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>No</Button>
                    </ModalFooter>

                </Form>

            }
            </Modal>
        </div>

        )
    }
}
CompleteModal.propTypes = {
  activity: PropTypes.object.isRequired,   
  showComplete: PropTypes.func.isRequired,
  completeActivity: PropTypes.func.isRequired,
 
   

}
const mapStateToProps = (state) => ({
  activity: state.activity,
  session: state.session,
 

})
export default connect(mapStateToProps,
  {
    showComplete,
    completeActivity,
     
  
  })
(CompleteModal)


