import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Select from 'react-select'
// import 'react-datepicker/dist/react-datepicker.css'
import ListCard from '../modal/ListCard'
import ListCardChild from '../modal/ListCardChild'

import Pagination from 'rc-pagination'
import Tooltip from "rc-tooltip";
import update from 'immutability-helper' 

import "rc-tooltip/assets/bootstrap.css";
import 'rc-pagination/assets/index.css' 



import { connect } from 'react-redux'

import { toggleErr, changeAssignee, setShowFab } from '../../../actions/activityAction'
import { setStakehType, viewStakehMember } from '../../../actions/location'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, Label, Input } from 'reactstrap'


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
      searchName: null,
      nav: [{ childName: "Root", childUri: "root" }]
    }
  }

  componentWillMount(){
    const {
      session: {
        user: { _id: bId }
      },
    } = this.props;
    // console.log(haha)
    this.props.setStakehType({ _action: "LISTLOCATION", _id: bId });
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
      this.props.changeAssignee(param)
      this.props.toggleErr(false)
      this.props.updList()
      this.props.setShowFab(false)
      
   
  }

  getChild=(stakehId,name)=>{
    const { user: { _id: bId }} = this.props.session
    const { nav } = this.state

    this.props.viewStakehMember({_action: "LISTLOCATION", _id: bId, URI: stakehId, ANODE: "A",})

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

  handleChange = e => {
    const inputName = e.target.getAttribute("name");
    const inputVal = e.target.value;
    // ===""?e.target.value=null:e.target.value
    // console.log(e.target.value)

    this.setState({
      [inputName]: inputVal
    });
    // console.log(inputName);
    // console.log(inputVal);
  };

  btnSearch=()=>{
    const { user: { _id }} = this.props.session
    const { searchName } = this.state
    this.props.setStakehType({_action: "LISTLOCATION", filtervalue: searchName, _id})
  }

  btnRefresh=()=>{
    const { user: { _id }} = this.props.session  
    this.props.setStakehType({ _action: "LISTLOCATION", _id })
  }


  render() {
    const { showErr } = this.props.activity
    const { totalCount,pageSize, locationMember } = this.props.location
    const { stakehList, assignee, listLoc, current, showChild, nav, searchName } = this.state
    // console.log(searchName)
    // console.log(assignee)


    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
           
            <ModalHeader toggle={this.toggle}>Location</ModalHeader>
            <ModalBody> 
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      name="searchName"
                      type="text"
                      placeholder="Seaarch Name"
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ height: 20, width: "100%" }}>
                        Search Location
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                    <img name="inputTo" src={require('../../../img/search-user.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnSearch} />
                  </Tooltip>
                  <Tooltip
                    placement="top"
                    overlay={
                      <div style={{ height: 20, width: "100%" }}>
                        Refresh Location
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    >
                    <img name="inputTo" src={require('../../../img/refresh.svg')} alt='inputTo' className='img-modal mr-2' onClick={this.btnRefresh} />
                  </Tooltip>
                </Row>
              </FormGroup>

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
                      iconCls={item.iconCls}
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
  setShowFab: PropTypes.func.isRequired,
   

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
    viewStakehMember,
    setShowFab
  
  })
  (ReassignModal)


