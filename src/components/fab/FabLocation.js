import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabRec,addChild,stakehNumb,pageWizard}) {
//    console.log(addChildBtn)
const sendActive=(e)=>{
    e.preventDefault()
    FabRec(e.target.name, e.target.alt)      
}

const deleteBtn=(e)=>{    
    e.preventDefault()
    pageWizard(e.target.name)
}

const addChildBtn=(e)=>{
    e.preventDefault()
    addChild(e.target.name)
    // console.log(e.target.name)
}

const updBasicBtn=(e)=>{
    e.preventDefault()    
    pageWizard(e.target.name)
}

const updSecBtn=(e)=>{
    e.preventDefault()    
    pageWizard(e.target.name)
}

 
   

  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Details</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                 <img name="viewLocation" src={require('../../img/fab-content.svg')} alt='view' className='img-fluid' onClick={sendActive}    />
            </Tooltip>
        </span>

            <ul className="fab-buttons">           
                {/* <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Stakeholder</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={deleteBtn}   />
                        </Tooltip> 
                    </span>
                </li>                 */}
            
            
                {/* <li className= "fab-buttons-item">
                    <span className={stakehNumb!=="5"?"fab-buttons-link":"d-none"}>
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Add New Stakeholder Child</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="addChild" src={require('../../img/addChild.svg')} alt='child' className='img-fluid' onClick={addChildBtn}  /> 
                        </Tooltip>
                    </span>
                </li> */}

                {/* <li className= "fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Group & Associate Info</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="group" data-wizardpage="group" src={require('../../img/share.svg')} alt='group' className='img-fluid' onClick={updSecBtn}  /> 
                        </Tooltip>
                    </span>
                </li> */}

                {/* <li className= "fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Access Info</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="access" data-wizardpage="access" src={require('../../img/access.svg')} alt='access' className='img-fluid' onClick={updSecBtn}  /> 
                        </Tooltip>
                    </span>
                </li> */}

                {/* <li className= "fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Security Info</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="security" data-wizardpage="security" src={require('../../img/padlock.svg')} alt='security' className='img-fluid' onClick={updSecBtn}  /> 
                        </Tooltip>
                    </span>
                </li>  */}

                {/* <li className= "fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Edit</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}>
                             <img name="basic" data-wizardpage="basic" src={require('../../img/fab-update.svg')} alt='basic' className='img-fluid' onClick={updBasicBtn}  /> 
                        </Tooltip>
                    </span>
                </li>  */}

                              
               
            </ul>
    </div>
  </div>
  )

}
