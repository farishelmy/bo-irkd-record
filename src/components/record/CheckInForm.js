import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Select from "react-select";
import 'rc-pagination/assets/index.css' 
 
import { toggleCheckIn } from "../../actions/backendAction"
import { setActivePage } from "../../actions/layoutInitAction"
import { setNewBread } from "../../actions/breadcrumbAction"
import UploadForm from "../record/UploadForm"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap'


class CheckInForm extends Component {
  constructor() {
    super()
    this.state = {
      RevOpt:[],
      valRev:[]
    }
  } 

  componentWillMount(){
    const opt = [
        { value: "Make New Revision",label:"Make New Revision" },
        { value: "Replace Current Revision",label:"Replace Current Revision"}
    ]
    this.setState({
        RevOpt: opt
    })
  }
 
  
  toggle = () => {
    const { showCheckIn } = this.props.record
    this.props.toggleCheckIn(!showCheckIn)
  }  

//   handleChange = (e) => {
//     const inputName = e.target.getAttribute('name')
//     const inputVal = e.target.value
//     // ===""?e.target.value=null:e.target.value  
//     // console.log(e.target.value)    

//     this.setState({
//         [inputName]: inputVal
//     })
//     // console.log(inputName)   
//     //  console.log(inputVal)
//   }

  handleSelectChange = (val) => {
    const { value, label } = val
    console.log(value)

    this.setState({ valRev: value })
  }

//   submitForm = () =>{
//     const {  
//       session: {
//         user: { _id }
//       },
//       record:{
//         showCheckIn
//       },
//       conf       
//     } = this.props
//     const { workflowName, tempVal } = this.state     
//     this.props.recWorkflow({ _action: "INITIATEWF",  workflowName: workflowName, _recordNo: conf["Record Number"], _id, template: tempVal })
//     this.props.toggleCheckIn(!showCheckIn)
//   }  

  render() {
    const { showCheckIn } = this.props.record
    const { RevOpt } = this.state
    const { newBread } = this.props.breadcrumb
    // console.log(newBread.label)
   
    
    return (
      <div>
        <Modal isOpen={showCheckIn} toggle={this.toggle} className={this.props.className}>
           
            <ModalHeader toggle={this.toggle}>New Workflow - initiating Record: {newBread.label} </ModalHeader>
            <ModalBody> 

                <UploadForm/>

                <FormGroup>
                    <Label>Revision</Label>
                    <Select
                    placeholder="Revision"     
                    options={RevOpt}        
                    onChange={this.handleSelectChange}
                    />
                </FormGroup>
               
                <FormGroup>
                    <Label>Comments</Label>
                    <Input name="Comment" type="textarea" onChange={this.handleChange}  />
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
CheckInForm.propTypes = {  
  session: PropTypes.object.isRequired, 
  breadcrumb: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  toggleCheckIn: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({ 
  session: state.session,
  breadcrumb: state.breadcrumb,
  record: state.rec
})
export default connect(mapStateToProps,
  {
    toggleCheckIn,
    setActivePage,    
  })
  (CheckInForm)


