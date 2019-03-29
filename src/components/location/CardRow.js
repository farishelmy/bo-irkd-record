import React from 'react'  
import posed from 'react-pose'


export default function CardRow({stakehId,name,typeName,isSel,markOnSel}) {
  const sendStakehId=()=>{
    markOnSel(stakehId,name,typeName)       
  }
   
    
       
  return (
    
        // <div data-id={stakehId} data-name={name} className="col-lg-6 col-md-6 col-sm-12 mt-2 mb-2">
        //     <div className={isSel?"d-flex justify-content-start align-items-center bg-primary":"d-flex justify-content-start align-items-center"} onClick={sendStakehId}>
        //         <img src={require('../img/StakeType/'+ typeName +'.svg')} alt="person" className="img-list" />              
        //         <p className={isSel?"ml-2 text-truncate text-light":"ml-2 text-truncate"}>{name}</p>                                        
        //     </div>
        // </div>      
         
        // <div className="col-6 col-md-4 col-lg-2 col-xl-2">     
        //     <div className={isSel?"card bg-primary":"card"} onClick={sendStakehId}>        
        //         <div className="text-center">
        //              <img src={require('../../img/Icon/'+typeName+'.svg')} alt={typeName} className="img-card mt-4"/>
        //         </div>
        //         <div className="card-body">                  
        //             <hr className={isSel?"mt-0 bg-light":"mt-0"} />
        //             <p className={isSel?"card-title mb-1 font-weight-bold text-truncate text-light":"card-title mb-1 font-weight-bold text-truncate text-muted"}>{decodeURIComponent(name)}</p>
        //             <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../../img/gear.svg')}/>Type: {decodeURIComponent(typeName)}</small></p>
        //             {/* <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/email.svg')} alt="email"/>Email: {decodeURIComponent(stakehId)}</small></p>
        //             <p className="card-text text-truncate"><small className={isSel?'text-light':'text-muted'}><img className="userIcon mr-2" src={require('../img/telephone.svg')} alt="email"/>Telephone Number: {decodeURIComponent(stakehId)}</small></p>                     */}
        //         </div>
        //     </div> 
        // </div>

        <div className="col-md-6 col-xl-4">                       
        <div className={isSel?"card bg-primary":"card"} onClick={sendStakehId}>              
          <div className="card-body">
            <div className="media align-items-center"><img src={require('../../img/'+typeName+'.svg')} alt={typeName} className="avatar avatar-xl mr-3"/>           
              <div className="media-body overflow-hidden">              
                <h5 className={isSel?" media-body overflow-hidden text-truncate mb-0 text-light":" media-body overflow-hidden text-truncate mb-0 text-muted"}>{name}</h5>                
                  <div className="card-text">    
                    {/* <p className={isSel?"text-truncate text-light":"text-truncate text-muted"}><img className="userIcon mr-2" src={require('../../img/gear.svg')}/>Type: {typeName}</p>             */}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>       


             
        
         
  )
}


