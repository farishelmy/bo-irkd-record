import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
  
import ListCard from '../../activity/modal/ListCard'
import ListCardChild from '../../activity/modal/ListCardChild'

import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import Select from "react-select";
import 'rc-pagination/assets/index.css' 

import { changeAssignee } from '../../../actions/activityAction'
import { setStakehType, viewStakehMember } from '../../../actions/location'
import { addAccessControl } from '../../../actions/backendAction'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col, Row, CardBody, Input } from 'reactstrap'


class CustomizeAccess extends Component {
  constructor() {
    super()
    this.state = {
      assignee: [],
      current: 1,
      listLoc:[],
      childName:null,
      childUri:null,
      showChild:false,
      nav: [{ childName: "Root", childUri: "root" }],
      customVal:[],
      presentVal:[],
    }
  }

  componentWillMount(){
    const {
        user: { _id }     
    } = this.props.session
    this.props.setStakehType({_action: "LISTLOCATION", _id})

    const {accessCont} =this.props
    const customVal = accessCont.privateLocs.map(itm=>({label:itm.Name, value:itm.uri}))
    this.setState({
      customVal:customVal,
      presentVal: customVal
    })

   
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.location.locType !== this.props.location.locType){
      const {locType}=this.props.location   
      this.setState({
        listLoc:locType
      })
    }
    if(prevState.customVal !== this.state.customVal){
      // console.log("yeya")
      
      // this.setState({
      //   customVal:customVal
      // })

    }

  }
  
  toggle = () => {
    const { modalShow } = this.props
    this.props.toggleClose(!modalShow)
  }

  
  addBtn=(name,id)=>{   
     
    const val = {label:name, value:id}
    // const { presentVal } = this.state
    
    const {accessCont} =this.props
    const customVal = accessCont.privateLocs.map(itm=>({label:itm.Name, value:itm.uri}))
    customVal.push(val)
    // customVal.push(val)
    // console.log(customVal)

    this.setState({       
      customVal:customVal,
    })

    this.props.addAccessControl(customVal)
    // this.props.toggleClose(false)
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
    console.log(param)
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

  handleSelectChange=(val)=>{
    console.log(val)
    this.setState({customVal:val})
  }
   

  render() {
    const { modalShow } = this.props
    const { totalCount,pageSize, locationMember } = this.props.location
    const { listLoc, current, showChild, nav, customVal, presentVal } = this.state

    // console.log(customVal)
    console.log(this.props.className)
     

    return (
      <div>
        <Modal isOpen={modalShow} toggle={this.toggle} className={this.props.className}>
           
            <ModalHeader toggle={this.toggle}>Location</ModalHeader>
            <ModalBody> 

              <FormGroup>
                <label>Reassign Location</label>

                <Select
                  placeholder="New Group"
                  isMulti                   
                  value={customVal}
                  noOptionsMessage={() => null}
                  onChange={this.handleSelectChange}
                  components= {
                    { 
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null 
                    }
                  }
                />
                  
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
CustomizeAccess.propTypes = {
  activity: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  changeAssignee: PropTypes.func.isRequired,
  setStakehType: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired,
  addAccessControl: PropTypes.func.isRequired,
  
   

}
const mapStateToProps = (state) => ({
  activity: state.activity,
  activity: state.activity,
  location: state.location,
  session: state.session,
  record: state.rec

})
export default connect(mapStateToProps,
  {
    changeAssignee,
    setStakehType,
    viewStakehMember,
    addAccessControl
  })
  (CustomizeAccess)


