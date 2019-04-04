import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import ListCard from '../modal/ListCard'
import ListCardChild from '../modal/ListCardChild'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css' 
import update from 'immutability-helper' 



import { connect } from 'react-redux'

import { toggleErr, changeAssignee } from '../../../actions/activityAction'
import { setStakehType, viewStakehMember } from '../../../actions/location'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody } from 'reactstrap'


class ReassignModal extends Component {
  constructor() {
    super()
    this.state = {
      stakehList: [],
      assignee: [],
      current: 1,
      listLoc:[],
      childName:null,
      childUri:null,
      showChild:false,
      nav: [{ childName: "Root", childUri: "root" }]
    }
  }

  componentWillMount(){
    const {locType}=this.props.location   
    this.setState({
      listLoc:locType

    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.locType !== this.props.location.locType){
      const {locType}=this.props.location   
      this.setState({
        listLoc:locType
      })
    }
    
    // if(prevProps.activity.activityDet !== this.props.activity.activityDet){
    //   const {activityDet} = this.props.activity
    //   const  assigned = activityDet.map(itm => ({label: itm.assignedTo, value: itm.assignedTo }))       
    //   this.setState({
    //     assignee: assigned
    //   })
    // }

  }
  
  toggle = () => {
    const { showErr } = this.props.activity
    this.props.toggleErr(!showErr)
  }

  
  addBtn=(name)=>{
    // console.log(name)

    const { activityUri } = this.props.activity     
    const { user: { _id: bId } } = this.props.session
 
      const param = {
        _action: "SAVEASSIGNEE",
        _activityUri: activityUri,
        assignee: name,
        _id: bId,
      }
      console.log(param)
      // this.props.changeAssignee(param)
      this.props.toggleErr(false)
   
  }

  getChild=(stakehId,name)=>{
    const { user: { _id: bId }} = this.props.session
    const { nav } = this.state

    const param = {
      _action: "LISTLOCATION",
      _id: bId,
      URI: stakehId,
      ANODE: "A",
    }
    // console.log(param)
    this.props.viewStakehMember(param)

    const newNav = update(nav, {
      $push: [
        {
          childName: name,
          childUri: stakehId
        }
      ]
    })
    // console.log(newNav)

    this.setState({
      showChild:true,
      nav: newNav
    })
  }

  backToParent=()=>{
    const { childUri, nav } = this.state 
    // console.log(nav[nav.length - 2].childUri)
    const { user: { _id: bId }} = this.props.session

    const param = {
      _action: "LISTLOCATION",
      _id: bId,
      URI: nav[nav.length - 2].childUri,
      ANODE: "A",
    }
    // console.log(param)
    this.props.viewStakehMember(param)

    const newNav = nav.slice(0, nav.length - 1)
    this.setState({ nav: newNav })
    
    if(nav[nav.length - 2].childUri === "root"){
      this.setState({
        showChild:false
      })
    }
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
    const { totalCount,pageSize, locationMember } = this.props.location
    const { stakehList, assignee, listLoc, current, showChild, nav } = this.state
    // console.log(test)
    // console.log(assignee)


    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
           
            <ModalHeader toggle={this.toggle}>Location</ModalHeader>
            <ModalBody> 

              <FormGroup>
                <label>Reassign Location</label>
                
                {
                  showChild!==false?
                  <div>
                    <div className='d-flex justify-content-between recListMenu' onClick={this.backToParent}>
                        <div className='left-col d-flex align-items-center'  >
                            <div className='icon mr-2'  >
                            <i className='fa fa-angle-left' />
                            {/* <img src={require(`../../../img/search.svg`)} className='listIcn' alt='...' /> */}
                            </div>                          
                            <p className='title text-primary mb-0'  >
                                {nav[nav.length - 1].childName}
                            </p>                            
                        </div>
                    </div>
                    {locationMember.map(item=>
                      <ListCardChild
                        key={item.uri}
                        name={item.Name}
                        uri={item.uri}
                        iconCls={item.iconCls}
                        leaf={item.leaf}
                        getParent={this.getChild}
                        addBtn={this.addBtn}
                        getChild={this.getChild} 
                        />
                    )}
                  </div>
                 
                :

                  listLoc.map(item=>
                    <ListCard                                         
                      key={item.uri} 
                      stakehId={item.uri}
                      name={item.Name}
                      typeName={item.iconCls}
                      leaf={item.leaf}
                      addBtn={this.addBtn}
                      getChild={this.getChild} 
                    />
                  )
                }

              </FormGroup>

              <div className="d-flex justify-content-end p-2">
                <Pagination onChange={this.onChangePaging} current={current} pageSize={pageSize} total={totalCount} />    
              </div>
              
                  
            </ModalBody>

            <ModalFooter>              
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>

          
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
  viewStakehMember: PropTypes.func.isRequired,
   

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
    setStakehType,
    viewStakehMember
  
  })
  (ReassignModal)


