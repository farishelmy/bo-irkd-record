import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,stakehSelObj,setStakehViewTrue,setStakehViewFalse,setShowFab,setStakehType} from '../../actions/location' 
import {setActivePage} from '../../actions/layoutInitAction'  
import {setStakeholderItemDetail,viewStakehMember} from '../../actions/location'
import {setNewBread} from '../../actions/breadcrumbAction'
// import {showMultiFab} from '../../actions/fabAction' 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Dropdown from './Dropdown'
import Breadcrumb from '../layout/Breadcrumb'
import CardRow from '../location/CardRow'  
import DetailCard from '../location/DetailCard'
import Fab from '../fab/FabLocation'
// import MultiFab from '../fab/MultiFab'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import 'rc-pagination/assets/index.css' 
 
 

class index extends Component {
    constructor() {
        super();     
        this.state = {
            locList:[],            
            locSelect:null,    
            fabMenu:null,       
            loading:true, 
            current: 1,
        };
    }   

    componentWillMount(){
        const {locType} = this.props.location      
        this.setState({
            locList:locType,             
        })           
              
    }   

    componentDidUpdate(prevProps,prevState){

        if(prevProps.location.locType!==this.props.location.locType){                   
            const {locType}=this.props.location 
            // console.log(locType)   
            const listLoc = locType.map(res=>({...res,isSel:false}))
            // console.log(liststakeh)

            this.setState({
                locList:listLoc
            })
            
                if(locType.length!== 0 ){
                    this.setState({loading: false})
                }         
        }
        
        // else if(prevProps.fab.isSelAll===!this.props.fab.isSelAll){
        //     const{isSelAll}=this.props.fab
        //     if(isSelAll){
        //         const{locList}=this.state
        //         const loc = locList.map(itm => ({ ...itm, isSel:true}))
        //         this.setState({locList: loc})
        //     }
        // }   

        // else if(prevState.locList !== this.state.locList){
        //     const{isMultiSel}=this.props.fab
        //     const{locList}=this.state
        //     // console.log(locList)
        //     if(isMultiSel){
        //         const listSelLoc=locList.filter(itm => itm.isSel === true).map(itm=>({uri:itm.uri,full_name:itm.Name}))
        //         this.props.setStakehSel(listSelLoc)
        //     }
        //     else
        //     {
        //         const selLoc=locList.find(itm => itm.isSel === true)
        //         // console.log(selLoc)
        //         if(selLoc!==undefined){
        //             const {uri:uri} = selLoc
        //             this.props.setStakehSel({
        //                 uri:uri                       
        //             })                   
        //         }
        //     }
        // }

        else if(prevProps.location.locSel!==this.props.location.locSel){
            const {locSel}=this.props.location
            // console.log(locSel)
            this.setState({locSelect:locSel})
        }  

        else if(prevProps.location.locLabel!==this.props.location.locLabel){
            const value = 1            
            this.setState({
                current: value
            })
        }
        
        
             
    }

    // Selection 
    markOnSel=(sId,name,typeName)=>{

        const val = ({sId,name,typeName}) 
        
        this.props.setStakehSel(sId) // URI 
        this.props.stakehSelObj(val)  //Obj 
         
       

        // console.log(name)
        
        const {locList} = this.state
        // console.log(listAct)
        const itmIdx = locList.findIndex(itm=>itm.uri === sId)
        const desIdx = locList.findIndex(itm=>itm.isSel===true)

        const newList = desIdx === -1?
        update(locList,{
          [itmIdx]:{isSel:{$set:true}}
        })
        :update(locList,{
          [itmIdx]:{isSel:{$set:true}},
          [desIdx]:{isSel:{$set:false}}
        })  
        // // select
        if (itmIdx===desIdx){
            this.props.setShowFab(false)
            this.props.setStakehSel(null) 
                      
         
        }
        else{
            this.props.setShowFab(true)
        }

        this.setState({
            locList: newList 
            
        })
    }

    //Direct Page
    setActivePage=(param)=>{    
            
        const {locSel,locObj} = this.props.location
        const {user:{_id:bId}} = this.props.session

        // console.log(locSel)

        //Breadcrumb
        this.props.setNewBread(false,{
            id: locObj.sId, 
            label:locObj.name, 
            typeName: locObj.typeName,
            activePage:'viewLocation', 
            isActive:true,
        })
       
        this.props.setActivePage(param)  //direct page to viewDetail
         

        //stkh Detail        
        this.props.setStakeholderItemDetail(locObj)    
        
        //Member
       const member ={
            _action:'LISTLOCATION',   
            _id: bId, 
            URI: locSel, 
            ANODE:"A"           
       }
    
       this.props.viewStakehMember(member)   
      
    }      

    //Pagination
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

    stakehView=()=>{       
        const { locView } = this.props.location
        this.props.setStakehViewFalse(!locView)
    }

    deleteMulti=(param)=>{
        // this.props.setActivePage(param)
        // this.props.setWizardPage(param)       

    }    
    
    // //LayoutView
    // stakehViewList=()=>{        
    //     this.props.setStakehViewTrue(true)        
    // }
    // stakehViewCard=()=>{       
    //     this.props.setStakehViewFalse(false)
    // }   

     
    render() {
        
        const {locView,showFab,stakehNumb,locLabel,totalCount,pageSize}=this.props.location
        const {locList, current, loading}=this.state  
        // console.log(locLabel)            
        // const {pageTitle}=this.props.layout
        // const {stakeholder_Detail}=this.props.stakeholderView 
        // console.log(loading)
        
        
        
        
        return (
            <Fragment>  
                {/* <div className="breadcrumb-holder">
                    <div className="container-fluid">
                        <Breadcrumb/>
                    </div>
                </div> */}
                
                

                <section>
                    <div className="container-fluid">
                        <header>
                        <div className="d-flex bd-highlight">
                            <h1 className="h3 display p-2 flex-grow-1 bd-highlight"><strong>{locLabel}</strong></h1>                        
                          
                            <div className="p-2 bd-highlight col-md-3"><Dropdown/></div> 
                         
                                <div className="p-2 bd-highlight d-flex align-items-center">                          

                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Create New Stakeholder</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary" data-pagename="addStakeholder" onClick={this.addStakeh}>
                                            <i className="fa fa-user-plus" data-pagename="addStakeholder"></i>
                                        </button>                            
                                    </Tooltip> */}

                                    <Tooltip
                                        placement='top'
                                        overlay={<div style={{ height: 20, width: "100%" }}>Toggle View</div>}
                                        arrowContent={<div className='rc-tooltip-arrow-inner' />}
                                    >
                                        <button className='btn btn-sm btn-primary ml-2' onClick={this.stakehView}>
                                        <i className={locView ? "fa fa-th-list" : "fa fa-th"} aria-hidden='true' />
                                        </button>
                                    </Tooltip>

                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>List View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.stakehViewList}>
                                            <i className="fa fa-tasks"></i>
                                        </button>                            
                                    </Tooltip>

                                    <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Card View</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2" onClick={this.stakehViewCard}>
                                            <i className="fa fa-th" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip> */}

                                    {/* <Tooltip
                                        placement="top"
                                        overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
                                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                                        <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                        </button>
                                    </Tooltip> */}
 
                                </div>
                        </div>
                        </header>          
                            <div className="row">    
                                
                                {/* Preloaders */}
                                {loading===false?<div className="display-none"/>
                                :<div className="container-fluid">
                                    <div className="d-flex justify-content-center mb-5">
                                        <div className="sk-circle">
                                            <div className="sk-circle1 sk-child"/>
                                            <div className="sk-circle2 sk-child"/>
                                            <div className="sk-circle3 sk-child"/>
                                            <div className="sk-circle4 sk-child"/>
                                            <div className="sk-circle5 sk-child"/>
                                            <div className="sk-circle6 sk-child"/>
                                            <div className="sk-circle7 sk-child"/>
                                            <div className="sk-circle8 sk-child"/>
                                            <div className="sk-circle9 sk-child"/>
                                            <div className="sk-circle10 sk-child"/>
                                            <div className="sk-circle11 sk-child"/>
                                            <div className="sk-circle12 sk-child"/>
                                        </div>
                                    </div>
                                </div>}


                                {locList.map(item=>locView?
                                 
                                    <DetailCard                                         
                                        key={item.uri} 
                                        stakehId={item.uri}
                                        name={item.Name}
                                        typeName={item.iconCls}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />:

                                    <CardRow                                         
                                        key={item.uri} 
                                        stakehId={item.uri}
                                        name={item.Name}
                                        typeName={item.iconCls}
                                        isSel={item.isSel}
                                        markOnSel={this.markOnSel} />                             
                                )}     

                            
                                {
                                    showFab?
                                    
                                        <Fab
                                            FabRec={this.setActivePage}                                 
                                            stakehNumb={stakehNumb} 
                                            addChild={this.child}
                                            pageWizard={this.activePage} />
                                        
                                   : 
                                   
                                    ""                                    
                                }                                        
                                
                            </div> 
                           
                            <div className="modal-footer justify-content-center">
                                <Pagination onChange={this.onChangePaging} current={current} pageSize={pageSize} total={totalCount} />    
                            </div>                             
                            
                    </div>                            
                        
                </section>           
            </Fragment>
        )
    }
}
index.propTypes={
    session: PropTypes.object.isRequired,
    // breadcrumb: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    // stakeholderView: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired, 
    // fab: PropTypes.object.isRequired,    
    setStakehViewTrue: PropTypes.func.isRequired,
    setStakehViewFalse: PropTypes.func.isRequired,   
    setShowFab: PropTypes.func.isRequired,   
    setActivePage: PropTypes.func.isRequired,
    setStakeholderItemDetail: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired,   
    // setWizardPage: PropTypes.func.isRequired,  
    // showMultiFab: PropTypes.func.isRequired,
    stakehSelObj: PropTypes.func.isRequired,   
    setNewBread: PropTypes.func.isRequired,  
    setStakehType: PropTypes.func.isRequired,  
    
}

const mapStateToProps= state =>({
        session:state.session,
        location:state.location,
        layout:state.layout,
        // stakeholderView: state.stakeholderView,
        // fab: state.fab,
        // breadcrumb: state.breadcrumb
       
})
    
export default connect(mapStateToProps,{
    setStakehSel,
    setStakehViewTrue,
    setStakehViewFalse,
    setShowFab,
    setActivePage,
    setStakeholderItemDetail,
    viewStakehMember,    
    // setWizardPage,    
    // showMultiFab,
    stakehSelObj,
    setNewBread,
    setStakehType
   
})(index)