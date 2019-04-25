import React from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

export default function Workflow({
  workflowName,
  activityUri,
  activityName,
  assignedTo,
  priority,
  dateStart,
  dateDue,
  iconCls,
  supervisor,
  isSel,
  markOnSel
}) {
  const handleClick = e => {
    markOnSel(
      workflowName,
      activityUri,
      activityName,
      assignedTo,
      priority,
      dateStart,
      dateDue,
      iconCls,
      supervisor,
      isSel
    );
  };

  return (
    // <div className={isSel?"card bg-primary":"card"} onClick={handleClick}>
    //     <div className={isSel?"card-header bg-primary":"card-header"}>
    //         <small className={isSel?"float-right font-weight-bold text-truncate text-light":"float-right font-weight-bold text-truncate text-muted"}>{workflowName}</small>
    //         <h3 className={isSel?"card-title font-weight-bold text-truncate":"card-title font-weight-bold text-truncate"}>{activityName}</h3>
    //     </div>

    //     <div className="card-body">
    //         <div className="media"><span style={{backgroundImage: `url(${require('../../img/'+iconCls+'.svg')})` }} className="img-card mr-3"></span>
    //             <div className="media-body">
    //                 <p className={isSel?"font-weight-bold text-truncate mb-0 text-light":"font-weight-bold text-truncate mb-0 text-muted"}><label className="text-body">Assign:</label> {assignedTo}</p>
    //                 <p className={isSel?"font-weight-bold text-truncate mb-0 text-light":"font-weight-bold text-truncate mb-0 text-muted"}><label className="text-body">Supervisor:</label> {supervisor}</p>
    //                 <p className={isSel?"font-weight-bold text-truncate mb-0 text-light":"font-weight-bold text-truncate mb-0 text-muted"}><label className="text-body">Priority:</label> {priority}</p>
    //                 <p className={isSel?"font-weight-bold text-truncate mb-0 text-light":"font-weight-bold text-truncate mb-0 text-muted"}><label className="text-body">Date Start:</label> {dateStart}</p>
    //                 <p className={isSel?"font-weight-bold text-truncate mb-0 text-light":"font-weight-bold text-truncate mb-0 text-muted"}><label className="text-body">Date Due:</label> {dateDue}</p>

    //             </div>
    //         </div>
    //     </div>

    // </div>

    <div className="col-lg-4 mb-4">
      <div
        className={isSel ? "card data-usage bg-primary" : "card data-usage"}
        onClick={handleClick}
      >
        <div className="row d-flex align-items-center">
          <div className="col-sm-4">
            <Tooltip
              placement="top"
              overlay={
                <div style={{ height: 20, width: "100%" }}>
                  Status: {iconCls}
                </div>
              }
              arrowContent={<div className="rc-tooltip-arrow-inner" />}
            >
              <img
                src={require("../../img/" + iconCls + ".svg")}
                className="img-card"
                alt="..."
              />
            </Tooltip>
          </div>
          <div className="col-sm-8">
            <span
              className={
                isSel
                  ? "font-weight-bold text-truncate text-light"
                  : "font-weight-bold text-truncate text-primary"
              }
            >
              {activityName}
            </span>
            <hr className="mt-3 mb-2" />
            <p
              className={
                isSel
                  ? "font-weight-bold text-truncate text-light"
                  : "font-weight-bold text-truncate text-muted"
              }
            >
              {" "}
              Assigned To: {assignedTo}{" "}
            </p>
            <p
              className={
                isSel
                  ? "font-weight-bold text-light"
                  : "font-weight-bold text-muted"
              }
            >
              {" "}
              Date Due: {dateStart}{" "}
            </p>
            {/* <small> {dateDue}</small> */}
          </div>
        </div>
      </div>
    </div>
  );
}
