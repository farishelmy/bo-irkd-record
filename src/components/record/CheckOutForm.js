import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'rc-pagination/assets/index.css' 
 
import { setActivePage } from "../../actions/layoutInitAction"
import { recDelete } from "../../actions/backendAction"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody, Input, Label } from 'reactstrap'


class CheckOutForm extends Component {
  constructor() {
    super()
    this.state = {
      comments: null,
      checkOut: null,
      conf: null
    }
  } 

  componentWillMount(){
    const {  
      conf,
      checkOut      
    } = this.props
    this.setState({
      conf: conf,
      checkOut: checkOut 
    })
   
  }

  toggle = () => {
    const { checkOut } = this.state
    this.props.closedModal(!checkOut)
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


  submitForm = () =>{
    const {  
      session: {
        user: { _id }
      }    
    } = this.props
    const { conf, comments, checkOut } = this.state     
    console.log({ _action: "CHECKOUT",  comments: comments, _recordNo: conf["Record Number"], _id, _recordUri: conf.uri })
    // this.props.recDelete({ _action: "CHECKOUT",  comments: comments, _recordNo: conf["Record Number"], _id, _recordUri: conf.uri })
    // this.props.closedModal(!checkOut)
  }  

  render() {
    const { conf, checkOut } = this.state

    
    return (
      <div>
        <Modal isOpen={checkOut} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Check Out - {conf['Record Number']} </ModalHeader>
            <ModalBody>               
              <FormGroup>
                <Label>Comments</Label>
                <Input name="comments" type="textarea" onChange={this.handleChange}  />
             </FormGroup>           
            </ModalBody>
            <ModalFooter>              
              <Button color="primary" onClick={this.submitForm}>Save</Button>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>

          
        </Modal>
      </div>

    )
  }
}
CheckOutForm.propTypes = {  
  session: PropTypes.object.isRequired, 
  record: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  recDelete: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({ 
  session: state.session,
  record: state.rec
})
export default connect(mapStateToProps,
  {
    setActivePage,
    recDelete    
  })
  (CheckOutForm)


