import React from 'react'

export default function ListEscalation({activityUri,activityName,workflowName,assignedTo,activityDateDue,iconCls,supervisor,priority,isSel,markOnSel}) {
    const handleClick=(e)=>{
        markOnSel(activityUri,activityName,workflowName,assignedTo,activityDateDue,iconCls,supervisor,priority)
    }
  return (
     

        <div className="col-12">
        <div className={isSel?"card mb-3 bg-primary":"card bg-light mb-3"} onClick={handleClick} >
            <div className=" d-flex justify-content-between align-items-center">
                <img className="p-2 img-fluid img-scale" src={require('../../../img/management.svg')} alt="activity"/>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{activityName}</p>
                    </div>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{workflowName}</p>
                    </div>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{assignedTo}</p>
                    </div>                    
            </div>
        </div>
        </div>
    
  )
}
