import React, { Component, Fragment } from 'react'
import update from 'immutability-helper' 
import Pagination from 'rc-pagination'
import {setStakehSel,stakehSelObj,setStakehViewTrue,setStakehViewFalse,setShowFab,setStakehType} from '../../actions/location' 
import {setActivePage} from '../../actions/layoutInitAction'  
import {setStakeholderItemDetail,viewStakehMember} from '../../actions/location'
import {setNewBread} from '../../actions/breadcrumbAction'
// import {showMultiFab} from '../../actions/fabAction' 
import Tooltip from "rc-tooltip"

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

 
import Breadcrumb from '../layout/Breadcrumb'
 
 
 

class index extends Component {
    constructor() {
        super();     
        this.state = {
          
        };
    }   

    

     
    render() {
        
    
        
        
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
                            <h1 className="h3 display p-2 flex-grow-1 bd-highlight"><strong>Audit Log</strong></h1>                        
                          
                         
                         
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
                                        <i className="fa fa-th-list" aria-hidden='true' />
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