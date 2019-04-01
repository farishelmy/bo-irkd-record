import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabRec,delBtn}) {

   
const sendActive=(e)=>{
    e.preventDefault()
    FabRec(e.target.name, e.target.getAttribute("name2"))
}

const deleteBtn=()=>{    
    delBtn()
    // console.log('delete')
}

    

  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Workflow</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                 >
                 <img name="workflowContent" name2="viewAct" src={require('../../img/fab-content.svg')} alt='view' className='img-fluid' onClick={sendActive}   />
            </Tooltip>
        </span>

             {/* <ul className="fab-buttons">
                 <li className="fab-buttons-item">
                     <span className="fab-buttons-link">
                         <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Stakeholder</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={deleteBtn}/>
                        </Tooltip>
                    </span>
                </li>

            </ul> */}
    </div>
  </div>
  )

}
