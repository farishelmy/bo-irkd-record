import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment, { isMoment } from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DetailCard from '../DetailCard'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css' 


import { connect } from 'react-redux'

import { toggleErr, changeAssignee } from '../../../actions/activityAction'
import { setStakehType } from '../../../actions/location'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class ReassignModal extends Component {
  constructor() {
    super()
    this.state = {
      stakehList: [],
      assignee: [],
      current: 1,
      test:[]
    }
  }

  componentWillMount(){
    const {locType}=this.props.location   
    // const stakehOptions = locType.map(itm=>({ value: itm.uri, label:itm.Name}))
    this.setState({
      // stakehList:stakehOptions,
      test:locType

    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.locType !== this.props.location.locType){
      const {locType}=this.props.location   
      // const stakehOptions = locType.map(itm=>({ value: itm.uri, label:itm.Name}))
      this.setState({
        // stakehList:stakehOptions,
        test:locType
      })
    }
    
    if(prevProps.activity.activityDet !== this.props.activity.activityDet){
      const {activityDet} = this.props.activity
      const  assigned = activityDet.map(itm => ({label: itm.assignedTo, value: itm.assignedTo }))       
      this.setState({
        assignee: assigned
      })
    }

  }
  
  toggle = () => {
    const { showErr } = this.props.activity
    this.props.toggleErr(!showErr)
  }

  handleAssignee=(param)=>{     
     
    this.setState({assignee:param})
    // console.log(param)
  }

  formSubmit = (e) => {
    e.preventDefault()
    const { assignee } = this.state
    const { activityUri } = this.props.activity     
    const { user: { _id: bId } } = this.props.session
 
      const param = {
        _action: "SAVEASSIGNEE",
        _activityUri: activityUri,
        assignee: assignee.label,
        _id: bId,
      }
      console.log(param)
      // this.props.changeAssignee(param)
      this.props.toggleErr(false)
  

  }

  addBtn=()=>{
    console.log("test")
  }

  onChangePaging = (page) => {
    const { user: { _id: bId }} = this.props.session
    const { pageSize, stakehLabel } = this.props.location      
    // console.log(page)          

    const param = {             
        _action: 'LISTLOCATION',
        _id: bId,
        page: page,
        start: (page-1)*pageSize,
        filterType: stakehLabel === "All Locations"?stakehLabel
            :stakehLabel === "Organization"?stakehLabel
            :stakehLabel === "Position"?stakehLabel
            :stakehLabel === "Person"?stakehLabel
            :stakehLabel === "Unknown"?stakehLabel
            :null,
    }
    // console.log(param)
    this.props.setStakehType(param)           
    
    this.setState({
        current: page,
    })
             

}


  render() {
    const { showErr } = this.props.activity
    const { totalCount,pageSize } = this.props.location
    const { stakehList, assignee, test, current } = this.state
    // console.log(test)
    // console.log(assignee)


    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Location</ModalHeader>
            <ModalBody> 

              <FormGroup>
                <label>Reassign Location</label>

                {test.map(item=>
                  <DetailCard                                         
                    key={item.uri} 
                    stakehId={item.uri}
                    name={item.Name}
                    typeName={item.iconCls}
                    isSel={item.isSel}
                    markOnSel={this.markOnSel}
                    addBtn={this.addBtn} />
                )}





                {/* <Select 
                  name="assignee"
                  options={stakehList}
                  onChange={this.handleAssignee}
                  value={assignee===""?null:assignee} 
                  placeholder="Location"
                  isClearable
                />  */}

              

              </FormGroup>

              <div className="d-flex justify-content-end p-2">
                <Pagination onChange={this.onChangePaging} current={current} pageSize={pageSize} total={totalCount} />    
              </div>
              
                  
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
ReassignModal.propTypes = {
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  toggleErr: PropTypes.func.isRequired,
  changeAssignee: PropTypes.func.isRequired,
  setStakehType: PropTypes.func.isRequired,
   

}
const mapStateToProps = (state) => ({
  activity: state.activity,
  activity: state.activity,
  location: state.location,
  session: state.session,

})
export default connect(mapStateToProps,
  {
    toggleErr,
    changeAssignee,
    setStakehType
  
  })
  (ReassignModal)


