import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabRec,delBtn}) {

   
const sendActive=(e)=>{
    e.preventDefault()
    FabRec(e.target.name, e.target.alt)
}


  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Edit Details</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                 >
                 <img name="wizardActivity" src={require('../../img/fab-update.svg')} alt='view' className='img-fluid' onClick={sendActive}   />
            </Tooltip>
        </span>        

            <ul className="fab-buttons">
                <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                        placement="left"
                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Suspend Activity</div>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                        >
                            <img name="suspend" src={require('../../img/suspend.svg')} alt='suspend' className='img-fluid' onClick={sendActive}/>
                    </Tooltip>
                </span>
            </li>

            <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                        placement="left"
                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Reasign Activity</div>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                        >
                            <img name="reassignActivity" src={require('../../img/user.svg')} alt='reassignActivity' className='img-fluid' onClick={sendActive}/>
                    </Tooltip>
                </span>
            </li>

            <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                        placement="left"
                        overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Complete Activity</div>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                        >
                            <img name="complete" src={require('../../img/complete.svg')} alt='complete' className='img-fluid' onClick={sendActive}/>
                    </Tooltip>
                </span>
            </li>


        </ul>
    </div>
  </div>
  )

}
