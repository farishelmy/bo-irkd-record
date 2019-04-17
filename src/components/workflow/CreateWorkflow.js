import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
  
import Select from "react-select";
import 'rc-pagination/assets/index.css' 

import { toggleCreateWF, recWorkflow, ListWorkflowTemplate, setShowFab, setWizardPage, panelContent, setRecordStore } from '../../actions/workflowAction'
import { populateActivity } from '../../actions/activityAction'
import { setActivePage } from "../../actions/layoutInitAction"
import { setNewBread } from "../../actions/breadcrumbAction"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody, Input } from 'reactstrap'


class CreateWorkflow extends Component {
  constructor() {
    super()
    this.state = {
      tempOpt:[],
      workflowName: null,
      tempVal:[],
    }
  } 

  componentWillMount(){
    const {  
      session: {
        user: { _id }
      },      
      ListWorkflowTemplate,
    } = this.props
    ListWorkflowTemplate({_action:"LISTWFTEMPLATE", _id})
  }

  componentDidUpdate(prevProps){
    if(prevProps.workflow.listWorkflowTemplate !== this.props.workflow.listWorkflowTemplate){
      const { listWorkflowTemplate } = this.props.workflow
      const opt = listWorkflowTemplate.map(itm => ({ value: itm.template, label: itm.template }))
      this.setState({ tempOpt:opt })
    }
  }
  
  toggle = () => {
    const { showCreateWF } = this.props.workflow
    this.props.toggleCreateWF(!showCreateWF)
  }  

  handleChange = (e) => {
    const inputName = e.target.getAttribute('name')
    const inputVal = e.target.value
    // ===""?e.target.value=null:e.target.value  
    // console.log(e.target.value)    

    this.setState({
        [inputName]: inputVal
    })
    // console.log(inputName)   
    //  console.log(inputVal)
  }

  handleSelectChange = (val) => {
    const { value, label } = val
    this.setState({ tempVal: value })
  }

  submitForm = () =>{
    const {  
      session: {
        user: { _id }
      },
      workflow:{
        showCreateWF
      },
      conf       
    } = this.props
    const { workflowName, tempVal } = this.state     
    this.props.recWorkflow({ _action: "INITIATEWF",  workflowName: workflowName, _recordNo: conf["Record Number"], _id, template: tempVal })
    this.props.toggleCreateWF(!showCreateWF)
    // this.props.setActivePage("workflowContent")
    // this.props.setShowFab(false)     
    // this.props.setWizardPage("general")
    // this.props.panelContent(true)
    // this.props.populateActivity({workflowName: workflowName, _action: "SEARCHACTIVITY", _id})
    // this.props.setListActivity({ _action: "SEARCHACTIVITY", workflowUri: wrkflSel, _id})
    // this.props.setRecordStore({ 
    //   _action: "SEARCHRECORD", 
    //   _id, 
    //   jsonQuery: JSON.stringify([{ 
    //     op: "EQUALS", field: "%26%26Related+Records+of+Workflow", 
    //     value1: workflowName 
    //   }]), 
    //   searchOrder: "0"
    // })    
    // //Breadcrumb
    // this.props.setNewBread(false, {
    //   id: wrkflSel,
    //   label: workflowName,
    //   activePage: "workflowContent",
    //   isActive: true
    // })

  }  

  render() {
    const { showCreateWF } = this.props.workflow
    const { tempOpt } = this.state
    const { newBread } = this.props.breadcrumb
    // console.log(newBread.label)
    
    return (
      <div>
        <Modal isOpen={showCreateWF} toggle={this.toggle} className={this.props.className}>
           
            <ModalHeader toggle={this.toggle}>New Workflow - initiating Record: {newBread.label} </ModalHeader>
            <ModalBody>               
              <FormGroup>
                <label>Workflow Name</label>
                <input name="workflowName" type="text" className="form-control" placeholder="Workflow Name" onChange={this.handleChange}  />
              </FormGroup>

              <FormGroup>
                <label>Template</label>
                <Select
                  placeholder="Template"     
                  options={tempOpt}        
                  onChange={this.handleSelectChange}
                />
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
CreateWorkflow.propTypes = {  
  session: PropTypes.object.isRequired,
  workflow: PropTypes.object.isRequired,
  breadcrumb: PropTypes.object.isRequired,
  toggleCreateWF: PropTypes.func.isRequired,
  recWorkflow: PropTypes.func.isRequired,
  ListWorkflowTemplate: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired, 
  setWizardPage: PropTypes.func.isRequired,
  panelContent: PropTypes.func.isRequired,
  populateActivity: PropTypes.func.isRequired,
  setRecordStore: PropTypes.func.isRequired, 
   

}
const mapStateToProps = (state) => ({ 
  session: state.session,
  workflow: state.workflow,
  breadcrumb: state.breadcrumb
})
export default connect(mapStateToProps,
  {
    toggleCreateWF, 
    recWorkflow,
    ListWorkflowTemplate,
    setActivePage,
    setShowFab, 
    setWizardPage, 
    panelContent, 
    populateActivity, 
    setRecordStore 
  })
  (CreateWorkflow)


