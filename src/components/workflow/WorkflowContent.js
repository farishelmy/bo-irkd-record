import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { panelContent } from "../../actions/workflowAction";
 
import WorkflowPanel from "../workflow/WorkflowPanel";
import PanelDropdown from "../workflow/PanelDropdown";
import ActivityPanel from "../workflow/ActivityPanel";

import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

class WorkflowContent extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

//   handleReturn = () => {
//     this.props.panelContent(true);
//   };

  render() {
    const { newBread } = this.props.breadcrumb;
    const label = newBread.label;

    return (
      <Fragment>
        <section className="statistics">
          <div className="container-fluid">
            <header>
              <div className="d-flex bd-highlight">
                <h1 className="h3 display p-2 flex-grow-1 bd-highlight">
                  <strong>
                    {`Workflow: ${label}`}
                  </strong>
                </h1>

                {/* <div className={panelContent!==true?"p-2 bd-highlight d-flex align-items-center":"d-none"}>                          

                <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Return to {workflowName}</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                    <button className="btn-circle btn-primary" onClick={this.handleReturn}>
                        <i className="fa fa-arrow-circle-left"></i>
                    </button>                            
                </Tooltip>
                </div> */}

                {/* <div className={panelContent!==true?"p-2 bd-highlight":"d-none"}><Button outline color="primary" onClick={this.handleReturn}>Return to {workflowName}</Button></div>  */}

                <div className="p-2 bd-highlight col-md-5">
                  <PanelDropdown />
                </div>
              </div>
            </header>

             
              <div className="row d-flex">
                {/* { 
                    panelContent === true?
                        <WorkflowPanel/>
                    : */}
                <ActivityPanel />
                {/* }     */}
              </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

WorkflowContent.propTypes = {
  session: PropTypes.object.isRequired,
  workflow: PropTypes.object.isRequired,
  activity: PropTypes.object.isRequired,
  panelContent: PropTypes.func.isRequired,
  breadcrumb: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  session: state.session,
  workflow: state.workflow,
  activity: state.activity,
  breadcrumb: state.breadcrumb
});
export default connect(
  mapStateToProps,
  { 
    panelContent,
  }
)(WorkflowContent);
