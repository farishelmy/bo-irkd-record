import React, { Component,Fragment } from 'react'
// import Breadcrumb from '../../layouts/Breadcrumb'
import MemberView from '../../location/view/MemberView'

import { setActivePage} from '../../../actions/layoutInitAction' 
import { setStakeholderItemDetail,viewStakehMember } from '../../../actions/location'
import { setStakehType,setStakehSel,setStakehNumb,stakehSelObj } from '../../../actions/location'
// import {setNewBread} from '../../../actions/breadcrumbAction'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
 

class ViewDetail extends Component {    
  constructor(){
      super()
      this.state={        
      }
  }

  setPageView=(sId,name,typeName)=>{    
     
    const {user:{_id:bId}} = this.props.session
    const val = ({sId,typeName,name})  
    
    // this.props.setNewBread(false,{
    //   id:sId,
    //   typeName:typeName,
    //   label:name, 
    //   activePage:'viewStakeh', 
    //   isActive:true,
    // })
    
    // console.log(sId)
    // console.log(stakehObj)
    
    this.props.setStakehSel(sId) 
    this.props.setStakehNumb(typeName)

    //stkh Detail     
    this.props.setStakeholderItemDetail(val)       

    //Stakeh Obj   
    this.props.stakehSelObj(val)

     //Member
     const stakehMember={
      _action:'LISTLOCATION',   
      _id: bId, 
      URI: sId, 
      ANODE:"A"             
    }
    this.props.viewStakehMember(stakehMember)

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

  render() {
   
    const { locationDetail, locationMember } = this.props.location 
      
    return (
      <Fragment>
         {/* <div className="breadcrumb-holder">
            <div className="container-fluid">
              <Breadcrumb/>
            </div>
        </div>         */}

        <div className="container-fluid mt-3"> 
          <header>                                   
            <h1 className="h3 display mb-3">{locationDetail.name}</h1>                                                      
          </header>        
            
            <div className="row"> 

              <div className="col-lg-4">
                <div className="card card-profile">
                  <div style={{backgroundImage: `url(${require('../../../img/'+ locationDetail.typeName +'.jpg')})` }} className="card-header"></div>
                  <div className="card-body text-center"><img src={require('../../../img/'+ locationDetail.typeName +'.svg')} className="card-profile-img"/>
                    <h3 className="mb-3">{locationDetail.name}</h3>
                      <p className="mb-4"><img className="userIcon mr-2" src={require('../../../img/role.svg')} alt="type"/>Type: {locationDetail.typeName ===""?"N/A":locationDetail.typeName} </p>  
                        <div className={locationMember.length!==0?"card-title text-center":"d-none"}>
                          <hr/> 
                          <h3>Members</h3>
                        </div>                                       
                          <div className={locationMember.length!==0?"card-body":"d-none"}>                   
                            {locationMember!==[0]?locationMember.map((item,idx)=><MemberView 
                                key={idx} 
                                stkhId={item.uri}  
                                stakehType={item.iconCls}                                     
                                fullName={item.Name}
                                typeName={item.iconCls}
                                setActivePage={this.setPageView} />):"No Member Items" }                                               
                          </div>
                  </div>                            
                </div>
              </div>
            
              {/* <div className="col-lg-4">
                <div className="card card-profile">
                  <div style={{backgroundImage: `url(${require('../../../img/Background/'+ stakeholderDetail.typeName +'.jpg')})` }} className="card-header"></div>
                    <div className="card-body text-center"><img src={require('../../../img/Icon/'+ stakeholderDetail.typeName +'.svg')} className="card-profile-img"/>
                      <h3 className="mb-3">{stakeholderDetail.name}</h3>
                        <hr/>
                          <p className="mb-4"><img className="userIcon mr-2" src={require('../../../img/role.svg')} alt="type"/>Type: {stakeholderDetail.typeName ===""?"N/A":stakeholderDetail.typeName} </p>                  
                    </div>
                </div>             

              
                <div className={locationMember.length===0?"d-none":"card"}>
                  <div className={locationMember.length!==0?"card-header":"d-none"}>
                    <h3>Associates</h3>
                  </div>       
                    <div className="card-body row">                    
                      <div className="col">  
                          {locationMember!==[0]?locationMember.map((item,idx)=><MemberView 
                              key={idx} 
                              stkhId={item.uri}  
                              stakehType={item.iconCls}                                     
                              fullName={item.Name}
                              typeName={item.iconCls}
                              setActivePage={this.setPageView} />):"No Member Items" } 
                      </div>                          
                    </div> 
                  </div>  

              </div>                 */}

            <div className="col-lg-8">
              <form id="simpleform" name="simpleform" >

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">My Profile</h3>
                </div>
                <div className="card-body">                   
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input name="name" type="text" value={locationDetail.name} placeholder="First name" className="form-control" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">User Type</label>
                    <input name="type" type="text" value={locationDetail.typeName} placeholder="User Type" className="form-control" onChange={this.handleChange}/>
                  </div>               
                </div>
                <div className="card-footer text-right">
                  <button className="btn btn-primary mr-2">Save</button>
                  <button className="btn btn-secondary">Cancel</button>
                </div>
              </div>           
                                                            
            </form>
          </div> 
        </div>            
      </div>
      </Fragment>
    )
  }
}
ViewDetail.propTypes={
  session: PropTypes.object.isRequired,  
  layout:PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setStakeholderItemDetail: PropTypes.func.isRequired,
  viewStakehMember: PropTypes.func.isRequired,
  // stakeholderlistType: PropTypes.object.isRequired,
  setStakehType: PropTypes.func.isRequired,
  setStakehSel: PropTypes.func.isRequired,
  setStakehNumb: PropTypes.func.isRequired,
  stakehSelObj: PropTypes.func.isRequired,
  // setNewBread: PropTypes.func.isRequired,
  
  
}

const mapStateToProps= state =>({
      session:state.session,      
      layout:state.layout,
      location: state.location,
      // stakeholderlistType:state.stakeholderlistType,
})
  
export default connect(mapStateToProps,{
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,     
    setStakehType,
    setStakehSel,
    setStakehNumb,
    stakehSelObj,
    // setNewBread
    

})(ViewDetail)
