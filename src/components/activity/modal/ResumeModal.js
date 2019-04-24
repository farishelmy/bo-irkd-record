import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { showComplete, completeActivity, setShowFab } from '../../../actions/activityAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class ResumeModal extends Component {
    constructor() {
        super()
        this.state = {
            resume:false,
            conf:null,    
        }
    }    

    componentWillMount() {
        const {
            session: {
            user: { _id: bId }
            },
            conf,
            resume,
        } = this.props;
        this.setState({
            conf:conf,
            resume:resume
        })
    }

    toggle = () => {
        const { resume } = this.state
        this.props.closedModal(!resume)
    };
  
    handleResult=(param)=>{    

        this.setState({
            result:param.value 
        })
        // console.log(param)
    }

    //complete without result
    formComplete = (e) => {
        e.preventDefault()
        const { resume } = this.state
        const { activityUri } = this.props.activity     
        const { user: { _id: bId } } = this.props.session
    
        const param = {
            _action: "RESUMEACTIVITY",
            _activityUri: activityUri,            
            _id: bId,
        }
        //   console.log(param)
        this.props.completeActivity(param)
        this.props.closedModal(!resume)
        this.props.updList()
        this.props.setShowFab(false)

         
    }

    render() {
        const { activityName }=this.props.activity   
        const { resume } = this.state        
        // console.log(result.inputValue)


        return (
        <div>
            <Modal isOpen={resume} toggle={this.toggle} className={this.props.className}>
                <Form onSubmit={this.formComplete}>
                    <ModalHeader toggle={this.toggle}>Complete Activity?</ModalHeader>
                    <ModalBody> 
                        <FormGroup>
                            <label>Are you sure to Resume this <strong>{activityName}</strong> activity? </label>                            
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>No</Button>
                    </ModalFooter>

                </Form>
            </Modal>
        </div>

        )
    }
}
ResumeModal.propTypes = {
  activity: PropTypes.object.isRequired,   
  showComplete: PropTypes.func.isRequired,
  completeActivity: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  activity: state.activity,
  session: state.session,
 

})
export default connect(mapStateToProps,
  {
    showComplete,
    completeActivity,
    setShowFab,
  })
(ResumeModal)


