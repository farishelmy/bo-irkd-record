import React from 'react'

export default function ListView({workflowName, markOnSel,workflowUri, isSel,supervisor,icon,dateStart,dateDue,jobNo,priority}) {
    const handleClick=(e)=>{
        markOnSel(workflowName, markOnSel,workflowUri, isSel,supervisor,icon,dateStart,dateDue,jobNo,priority)
    }
  return (
     

        <div className="col-12">
        <div className={isSel?"card mb-3 bg-primary":"card mb-3"} onClick={handleClick} >
            <div className=" d-flex justify-content-between align-items-center">
                <img className="p-2 img-fluid img-scale" src={require('../../img/'+icon+'.svg')} alt="activity"/>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{workflowName}</p>
                    </div>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{dateStart}</p>
                    </div>
                    <div className="col p-2">
                        <p className={isSel?"card-title mb-1 font-weight-bold text-light":"card-title mb-1 font-weight-bold text-muted"}>{dateDue}</p>
                    </div>
            </div>
        </div>
        </div>
    
  )
}
