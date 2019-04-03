import React from 'react'
import posed from 'react-pose'
import { Button } from 'reactstrap';
 

export default function DetailCard({stakehId,name,typeName,isSel,markOnSel,email, addBtn}) {
    const sendStakehId=()=>{
        markOnSel(stakehId,name,typeName)
    }    

    const handleAdd=()=>{
        addBtn(name)
        
    }
   
   
return (
    <div className="col-12">   
        
        {/* <div className='left-col d-flex align-items-center'>
            <div className='icon'>
                <Button color="link"><i className='fa fa-plus-square' onClick={handleAdd}/></Button>             
            </div>
            <p className='title text-primary mb-0'>
                {name}
            </p>
            <i className='fa fa-plus-square' />
        </div> */}

        <div className='d-flex justify-content-between align-items-center recListMenu' data-name='getChild' >
            <div className='left-col d-flex align-items-center'>
                <div className='icon mr-2 d-flex align-items-start' data-name='addBtn'>
                    <i className='fa fa-plus mr-2' data-name='addBtn' />
                <img src={require('../../img/'+typeName+'.svg')} className='listIcn' alt="typeName" />
                </div>
                <div>
                <p className='title text-primary mb-0'>{name}</p>
                </div>
            </div>

     
           
    
            <div className='right-col text-right' data-name='getChild'>
                <i className='fa fa-arrow-right text-primary' data-name='getChild' />
                <i className='fa fa-chevron-right' data-name='getChild' />
            </div>
           
        </div>

        

           
        
    </div>
)
}