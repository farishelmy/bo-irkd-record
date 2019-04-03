import React from 'react'
import Tooltip from "rc-tooltip"
import "rc-tooltip/assets/bootstrap.css"

export default function Workflow({workflowName, markOnSel,workflowUri, isSel,supervisor,iconCls,dateStart,dateDue,jobNo,priority}) {
    
    const handleClick=(e)=>{
        markOnSel(workflowName, markOnSel,workflowUri, isSel,supervisor,iconCls,dateStart,dateDue,jobNo,priority)
    }
      
    return (
        <div className="col-md-6 col-xl-4">
        
           <div className={isSel?"card bg-primary":"card"} onClick={handleClick} >
               <div className="text-center">
                    
            <Tooltip
              placement="top"
              overlay={
                <div style={{ height: 20, width: "100%" }}>
                  Status: {iconCls}
                </div>
              }
              arrowContent={<div className="rc-tooltip-arrow-inner" />}
              >
              <img className="img-card mt-4" src={require('../../img/'+iconCls+'.svg')} alt="activity"/>
            </Tooltip>

               </div>
               <div className="card-body text-center">                  
                   <hr className={isSel?"mt-0 bg-light":"mt-0"} />
                   <p className={isSel?"card-title mb-1 font-weight-bold text-truncate text-light":"card-title mb-1 font-weight-bold text-truncate text-muted"}>{workflowName}</p>
               </div>
           </div>
           
       </div>

      // <div className="col-md-6 col-xl-4">                       
      // <div className={isSel?"card bg-primary":"card"} onClick={handleClick}>              
      //   <div className="card-body">
      //     <div className="media align-items-center"><img src={require('../../img/Icon/'+icon+'.svg')} alt={icon} className="img-card mr-3"/>           
      //       <div className="media-body overflow-hidden">              
      //         <h5 className={isSel?" media-body overflow-hidden text-truncate mb-0 text-light":" media-body overflow-hidden text-truncate mb-0 text-muted"}>{workflowName}</h5>               
      //         <p className={isSel?"card-text text-truncate text-light":"card-text text-truncate text-muted"}><img className="userIcon mr-2" src={require('../../img/Icon/supervisor.svg')}/>{supervisor}</p> 
      //           {/* <p className={isSel?"card-text text-truncate text-light":"card-text text-truncate text-muted"}>                         
      //             Date Started: {dateStart}
      //             <br/>
      //             Date Due: {dateDue}
      //           </p> */}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // </div> 


         
    
  )
}
