import {
    LIST_ACTIVITY_DUE,
    ACTIVITY_DETAIL,
    ACTIVITY_URI,
    ACTIVITY_NAME,
    SET_CARD_VIEW,
    SHOW_FAB,
    WIZARD_PAGE,
    CHECK_RESULT,
    GET_RESULT,
    PAGE_SIZE,
    TOTAL_COUNT,
    SHOW_ERR,
    SHOW_COMPLETE,
    SHOW_SUSPEND,
    LIST_ACTIVITY,
    SHOW_MODAL_SEARCH,

} from './types'
    
import {gwUrl} from '../config/appConf'
import {converter} from '../utilis/queryStringConverter'

//List Option Workflow
export const setListActDue=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_ACTIVITY_DUE,
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

//Get Detail of Activity
export const getDetails=(param)=>{
    return {
        type:ACTIVITY_DETAIL,
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

//Set Activity Name
export const activityName=(param)=>{
    return {
        type:ACTIVITY_NAME,
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

//FAB
export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Set Wizard Page Name
export const setWizardPage=(param)=>{
    return {
        type:WIZARD_PAGE,
        payload:param
    }
}

//Check Result
export const checkResult=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: CHECK_RESULT,
            payload: res.hasResult
        })
    })

}

//Get Result
export const getResult=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res.data[1].config)
        dispatch({           
            type: GET_RESULT,
            payload: res.data[1].config
        })
    })

}

//toggle
export const toggleErr = (modalstate) => ({
    type: SHOW_ERR,
    payload: modalstate
})

//Toggle Complete
export const showComplete = (modalstate) => ({
    type: SHOW_COMPLETE,
    payload: modalstate
})

//Toggle Suspend
export const showSuspend = (modalstate) => ({
    type: SHOW_SUSPEND,
    payload: modalstate
})

//Change Assignee
export const changeAssignee=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        console.log(res)
        // dispatch({           
        //     type: LIST_ACTIVITY_DUE,
        //     payload: res.data
        // })
    })

}

//Activity Complete
export const completeActivity=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        console.log(res)
        // dispatch({           
        //     type: GET_RESULT,
        //     payload: res.data[1].config
        // })
    })

}

//Activity Suspend
export const suspendActivity=(param)=>dispatch=>{
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        console.log(res)
        // dispatch({           
        //     type: GET_RESULT,
        //     payload: res.data[1].config
        // })
    })
}


//Search Workflow
export const populateActivity=(param)=>dispatch=>{
    // console.log(param)
    const url=gwUrl+converter(param)  
    fetch(url)
    .then(res=>res.json())
    .then(res=>{ 
        // console.log(res)
        dispatch({           
            type: LIST_ACTIVITY,
            payload: res.data
        })
    })
  
}

//Search Activity
export const toggleSearchActivity = (param) => ({
    type: SHOW_MODAL_SEARCH,
    payload: param
})


 
  


 

