import React,{useEffect, useState} from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabAction,conf}) {
    // console.log(conf)
    const [iconCls,setIconCls] = useState(null)

    useEffect(() => {
        if (conf !== null) {
            setIconCls(conf.iconCls)
        }     
    },[conf])


    const sendActive=(e)=>{
        e.preventDefault()
        FabAction(e.target.name, e.target.alt)
    }


  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Activity</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                 >
                 <img name="details" src={require('../../img/fab-update.svg')} alt='view' className='img-fluid' onClick={sendActive}   />
            </Tooltip>
        </span>        

            <ul className="fab-buttons">


                {iconCls!=="activity-suspend"?
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
                :
                    <li className="fab-buttons-item">
                        <span className="fab-buttons-link">
                            <Tooltip
                                placement="left"
                                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Resume Activity</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                                <img name="resume" src={require('../../img/resume.svg')} alt='resume' className='img-fluid' onClick={sendActive}/>
                            </Tooltip>
                        </span>
                    </li>
                }

                {iconCls!=="activity-suspend"?
                    <li className="fab-buttons-item">
                            <span className="fab-buttons-link">
                                <Tooltip
                                placement="left"
                                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Reasign Activity</div>}
                                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                >
                                    <img name="assign" src={require('../../img/user.svg')} alt='reassignActivity' className='img-fluid' onClick={sendActive}/>
                            </Tooltip>
                        </span>
                    </li>
                :
                    ""
                }

                {iconCls!=="activity-suspend"?
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
                :
                    ""
                }

                <li className="fab-buttons-item">
                        <span className="fab-buttons-link">
                            <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Show Records</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                                <img name="records" src={require('../../img/fab-child.svg')} alt='showRecords' className='img-fluid' onClick={sendActive}/>
                        </Tooltip>
                    </span>
                </li>
            </ul>
    </div>
  </div>
  )

}
