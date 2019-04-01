import React from 'react'


const FolderTabHeader =({activeEditor,active,isContainer})=>{
    
        const sendActive=(e)=>{
            e.preventDefault()
            activeEditor(e.target.name)
        }

    return (
      
<div className="row colWrap justify-content-center">

<div className="col-3 colContainer">
    <div className={active==='general'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
            name="general"
            src={require('../../../img/information.svg')} alt="general"
            className={active==='general'?'img-fluid desaturate':'img-fluid'}
            onClick={sendActive} />
        </div>
    </div>

    <div className={isContainer?"col-3 colContainer":"col-3 colContainer hideLine"}>
   <div className={active==='record'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
                name="record"
                src={require('../../../img/fab-child.svg')} alt="record"
                className={active==='record'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div>

    <div className={isContainer?"col-3 colContainer":"col-3 colContainer hideLine"}>
   <div className={active==='escalation'?'tab activeTab mx-auto':'tab mx-auto'}>
            <img
                name="escalation"
                src={require('../../../img/escalation.svg')} alt="escalation"
                className={active==='escalation'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div>

   <div className={isContainer?"col-3 colContainer":"d-none"}>
    <div className={active==='email'?'tab activeTab mx-auto':'tab mx-auto'}>
                <img
                name="email"
                src={require('../../../img/mail.svg')} alt="email"
                className={active==='email'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive} />
        </div>
    </div> 

    
    

</div>

    )}


export default FolderTabHeader