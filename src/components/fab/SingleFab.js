import React from "react"
import Tooltip from "rc-tooltip"
const FolderFab = ({
  recConf: {
    _property: {
      allowcheckin,
      allowcheckout,
      allowcreateworkflow,
      allowdelete,
      allowdownload,
      allowfinal,
      allowview,
      hascontained,
      hascontainer,
      hasrevision,
      haspart,
      hasworkflow
    }
  },
  editRec
}) => {
  const sendActive = e => {
    //     e.preventDefault()
    editRec(e.target.name)
  }
  //console.log(_property)
  return (
    <div className='fab'>
      <span className='fab-action-button'>
        <Tooltip
          placement='left'
          overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>View Details</div>}
          arrowContent={<div className='rc-tooltip-arrow-inner' />}
        >
          <img name='details' src={require("../../img/fab-content.svg")} alt='details' className='img-fluid' onClick={sendActive} />
        </Tooltip>
      </span>
      <ul className='fab-buttons'>
        {allowdelete ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Delete Folder</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='delete' src={require("../../img/fab-trash.svg")} alt='delete' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        <li className='fab-buttons-item'>
          <span className='fab-buttons-link'>
            <Tooltip
              placement='left'
              overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Email</div>}
              arrowContent={<div className='rc-tooltip-arrow-inner' />}
            >
              <img name='email' src={require("../../img/fab-email.svg")} alt='email' className='img-fluid' onClick={sendActive} />
            </Tooltip>
          </span>
        </li>
        {allowfinal ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Finalize Record</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='finalize' src={require("../../img/fab-final.svg")} alt='finalize' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
        {hasworkflow ? (
          <li className='fab-buttons-item'>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Show Workflow</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='workflow' src={require("../../img/fab-workflow.svg")} alt='workflow' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        {allowcreateworkflow ? (
          <li className='fab-buttons-item'>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Initiate Workflow</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img
                  name='initWorkflow'
                  src={require("../../img/fab-init-workflow.svg")}
                  alt='initWorkflow'
                  className='img-fluid'
                  onClick={sendActive}
                />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        {allowcheckout ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Check out</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='checkout' src={require("../../img/fab-checkout.svg")} alt='checkout' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        {allowcheckin ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Check in</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='checkin' src={require("../../img/fab-checkin.svg")} alt='checkin' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
        {allowview ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>View Content</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='content' src={require("../../img/fab-child.svg")} alt='content' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
        {allowdownload ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Download Content</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='download' src={require("../../img/fab-download.svg")} alt='download' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
        {hasrevision ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>View Revision</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='revision' src={require("../../img/fab-revision.svg")} alt='revision' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        {hascontained ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Jump to Child</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='child' src={require("../../img/fab-child-new.svg")} alt='child' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}

        {hascontainer ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Jump to Parent</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='parent' src={require("../../img/fab-goParent.svg")} alt='parent' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
        {haspart ? (
          <li className={"fab-buttons-item"}>
            <span className='fab-buttons-link'>
              <Tooltip
                placement='left'
                overlay={<div style={{ height: 20, width: "100%", textAlign: "center" }}>Part</div>}
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <img name='part' src={require("../../img/fab-part-link.svg")} alt='part' className='img-fluid' onClick={sendActive} />
              </Tooltip>
            </span>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  )
}
export default FolderFab
