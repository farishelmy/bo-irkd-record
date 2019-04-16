import React from "react";
import Tooltip from "rc-tooltip";

export default function MemberView({
  stkhId,
  fullName,
  typeName,
  setActivePage,
  stakehType
}) {
  const pageBtn = e => {
    e.preventDefault();
    setActivePage(stkhId, fullName, stakehType);
    // console.log(e.target.getAttribute('data-id'))
  };

  return (
    // old view
    <div>
      <div
        id={stkhId}
        name={fullName}
        className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2"
      >
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={require("../../../img/" + typeName + ".svg")}
            alt="person"
            className="img-list"
          />
          <Tooltip
            placement="right"
            overlay={
              <div style={{ height: 20, width: "100%" }}>{fullName}</div>
            }
            arrowContent={<div className="rc-tooltip-arrow-inner" />}
          >
            <p
              className="ml-1 text-truncate btn btn-link"
              data-id={stkhId}
              onClick={pageBtn}
            >
              {fullName}
            </p>
          </Tooltip>
        </div>
      </div>
    </div>

    // <div id={stkhId} name={fullName} className="mt-2">
    //   <div className={"col-lg-12 col-md-12 col-sm-12 "} >
    //       <img src={require('../../../img/Icon/'+ typeName +'.svg')} alt="person" className="img-list mx-auto d-block" />
    //       <p className={"card-title text-truncate ml-2 mb-2 btn btn-link"} data-id={stkhId} onClick={pageBtn}>{decodeURIComponent(fullName)}</p>
    //   </div>
    // </div>
  );
}
