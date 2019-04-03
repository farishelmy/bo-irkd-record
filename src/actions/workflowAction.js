import { 
    LIST_WORKFLOW,  
    POPULATE_WORKFLOW,
    WORKFLOW_TEMPLATE, 
    SET_CARD_VIEW, 
    WORKFLOW_SEL,
    SHOW_FAB,
    WORKFLOW_NAME,
    PAGE_SIZE,
    TOTAL_COUNT,
    PANEL_CONTENT,
    LIST_ACTIVITY, 
    WIZARD_PAGE, 
    SET_RECORD_STORE,
    TITLE_ACTIVITY_SEL,
    SET_CONTAINER_LINE, 
    ACTIVITY_DETAIL,
    ACTIVITY_URI, 
    ACTIVITY_NAME,
    ACTIVITY_STATUS,
    SHOW_MODAL_SEARCH
} from './types'
    
    import {gwUrl} from '../config/appConf'
    import {converter} from '../utilis/queryStringConverter'

//List Option Workflow
export const ListWorkflowTemplate=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_WORKFLOW,
            payload: res.data
        })
    })

}

//Workflow Template
export const workflowTemplate=(param)=>dispatch=>{
    dispatch({
        type: WORKFLOW_TEMPLATE,
        payload: param
    })
}

// List of Workflow based on Template
export const populateWorkflow=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: POPULATE_WORKFLOW,
            payload: res.data
        })
        dispatch({           
            type: PAGE_SIZE,
            payload: res.pageSize
        })
        dispatch({           
            type: TOTAL_COUNT,
            payload: parseInt(res.totalCount)
        })
    })
}

//Set Workflow Name
export const setWorkflowName=(param)=>{
    return {
        type:WORKFLOW_NAME,
        payload:param
    }
}


//Set Card View
export const setCardView=(cardStatus)=>{
    // console.log(cardStatus)
   return {
       type:SET_CARD_VIEW,
       payload:cardStatus
   }
}

//Set Workflow URI
export const setSelWorkFlow=(wrkflSel)=>{
    return {
        type:WORKFLOW_SEL,
        payload:wrkflSel
    }
}

export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Get Activity form workflow
export const getDetails=(param)=>{
    return {
        type:ACTIVITY_DETAIL,
        payload:param
    }
}

//Panel Content
export const panelContent=(param)=>{
    return {
        type:PANEL_CONTENT,
        payload:param
    }

}  

//Get workflow details
export const setListActivity=(param)=>dispatch=>{
    const url=gwUrl+converter(param)
    fetch(url)
    .then(res=>res.json())
    .then(res=>{  
        dispatch({
            type: LIST_ACTIVITY,
            payload: res.data
        })
    })

}

//Get Record
export const setRecordStore = (param) => dispatch =>{
    // console.log(param)
    const url=gwUrl+converter(param)
    // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:SET_RECORD_STORE,
                payload:res.data
            })
        })
}

//Set Wizard Page Name
export const setWizardPage=(param)=>{
    return {
        type:WIZARD_PAGE,
        payload:param
    }
}

//Set Container Line
export const setContinerLine=(param)=>{
    return {
        type:SET_CONTAINER_LINE,
        payload:param
    }
}

//Get Activity Detail
export const getDetailsWorkflow = (param) => dispatch =>{
    // console.log(param)
    const url=gwUrl+converter(param)
    // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:ACTIVITY_DETAIL,
                payload:res.data
            })
        })
}

//Get Activity status in Panel Dropdown
export const setSelectAct=(param)=>{
    return {
        type:ACTIVITY_STATUS,
        payload:param
    }
}

//Set Activity Name
export const activityName=(param)=>{
    return {
        type:ACTIVITY_NAME,
        payload:param
    }
}

//Set Activity URI
export const activityUri=(param)=>{
    return {
        type:ACTIVITY_URI,
        payload:param
    }
}

// Set Title Activity Selected
export const titleActivitySel=(param)=>{
    return {
        type:TITLE_ACTIVITY_SEL,
        payload:param
    }
}

export const toggleSearchWorkflow=(param)=>{
    return {
        type:SHOW_MODAL_SEARCH,
        payload:param
    }
}





    





 

 



