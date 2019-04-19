import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import Breadcrumb from '../layouts/Breadcrumb'
import { setActivePage } from "../../actions/layoutInitAction";
import {
  setCardView,
  setSelWorkFlow,
  setShowFab,
  getDetails,
  setWorkflowName
} from "../../actions/workflowAction";
import {
  setRecordStore,
  setListActivity,
  setWizardPage
} from "../../actions/workflowAction";
// import { setNewBread } from '../../actions/breadcrumbAction'

import Fab from "../fab/FabWorkflowContent";
import Tooltip from "rc-tooltip";
import update from "immutability-helper";
import "rc-tooltip/assets/bootstrap.css";

class WorkflowPanel extends Component {
  constructor() {
    super();
    this.state = {
      workflow: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.workflow.workflowDetails !== this.props.workflow.workflowDetails) {
      const { workflowDetails } = this.props.workflow;
      console.log(workflowDetails);
      this.setState({
        workflow: workflowDetails
      });
    }
  }

  componentWillMount() {
    const { workflowDetails } = this.props.workflow;
    this.setState({
      workflow: workflowDetails
    });
  }

  render() {
    const { workflow } = this.state;
    // console.log(workflow)

    return (
      <Fragment>
        {workflow.map((item, idx) => (
             <div key={idx} className='col-lg-4 mb-4'>
             <div className='card data-usage' onClick={this.markOnSel}>
                 <div className='row d-flex align-items-center'>
                 <div className='col-sm-4'>
                     <img src={require("../../img/"+item.iconCls+".svg")} className='img-card mr-3' alt='...' />
                 </div>
                 <div className='col-sm-8'>
                     <span className='text-primary'>{item.workflowName}</span>
                     <hr className='mt-3 mb-2' />
                     <small>{item.supervisor}</small>
                 </div>
                 </div>
             </div>
             </div>
        //   <div key={idx} className="card" onClick={this.markOnSel}>
        //     <div className="card-header">
        //       <h3 className="card-title">{item.workflowName}</h3>
        //     </div>
        //     <div className="card-body">
        //       <div className="media">
        //         <span style={{ backgroundImage: `url(${require("../../img/"+item.iconCls+".svg")})` }} className="img-card mr-3" />
        //         <div className="media-body">
        //           <p className="text-muted mb-0">
        //             <label className="text-body">Supervisor:</label>{" "}
        //             {item.supervisor}
        //           </p>
        //           <p className="text-muted mb-0">
        //             <label className="text-body">Priority:</label>{" "}
        //             {item.priority}
        //           </p>
        //           <p className="text-muted mb-0">
        //             <label className="text-body">Date Start:</label>{" "}
        //             {item.dateStart}
        //           </p>
        //           <p className="text-muted mb-0">
        //             <label className="text-body">Date Due:</label>{" "}
        //             {item.dateDue}
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        ))}
        <Fab />       
      </Fragment>
    );
  }
}

WorkflowPanel.propTypes = {
  session: PropTypes.object.isRequired,
  workflow: PropTypes.object.isRequired,
  setCardView: PropTypes.func.isRequired,
  getDetails: PropTypes.func.isRequired,
  setSelWorkFlow: PropTypes.func.isRequired,
  setWorkflowName: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setRecordStore: PropTypes.func.isRequired,
  setListActivity: PropTypes.func.isRequired,
  // setNewBread: PropTypes.func.isRequired,
  setWizardPage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  session: state.session,
  workflow: state.workflow
});
export default connect(
  mapStateToProps,
  {
    setActivePage,
    setCardView,
    setSelWorkFlow,
    setShowFab,
    setListActivity,
    getDetails,
    // setNewBread,
    setRecordStore,
    // setPageTitle,
    setWorkflowName,
    setWizardPage
  }
)(WorkflowPanel);
