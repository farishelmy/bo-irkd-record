import React from 'react'
 
export default function ListCard({stakehId,name,iconCls,leaf,addBtn,getChild}) {

    const handleAdd=()=>{
        addBtn(name,stakehId)
        
    }

    const handleChild =()=> {        
        getChild(stakehId,name)
    }
       
   
   
return (

        <div className='d-flex justify-content-between align-items-center recListMenu'>
            <div className='left-col d-flex align-items-center'>
                <div className='icon mr-2 d-flex align-items-start'>
                    <i className='fa fa-plus mr-2' onClick={handleAdd}/>
                    <img src={require('../../../img/'+iconCls+'.svg')} className='listIcn' alt="typeName" />
                </div>
                <div>
                <p className='title text-primary mb-0'>{name}</p>
                </div>
            </div>      
        {   
            leaf!==true?
                <div className='right-col text-right' onClick={handleChild}>
                    <i className='fa fa-arrow-right text-primary' />
                    <i className='fa fa-chevron-right' />
                </div>
            :

            ""
        }
           
        </div>

        

           
        
    
)
}