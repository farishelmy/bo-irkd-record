import {
    LOCATION_VIEW,
    LOCATION_MEMBER,
    LOC_TYPE,
    LOC_SEL,  
    LOC_SEL_OBJ, 
    LOC_VIEW,
    SHOW_FAB,  
    LOC_LABEL,  
    LOC_NUMB,  
    PAGE_SIZE_LOCATION,  
    TOTAL_COUNT_LOCATION,
    SEARCH_STATUS

} from './types'
import {gwUrl} from '../config/appConf'
import {converter} from '../utilis/queryStringConverter'

//Call stkh Detail
export const setStakeholderItemDetail = (param) => {
    return {
        type:LOCATION_VIEW,
        payload:param
    }
}

//Call member 
export const viewStakehMember = (param) => dispatch =>{
    // console.log(param)
    const url= gwUrl+ converter(param)    
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log( res.data)
            dispatch({
                type:LOCATION_MEMBER,payload:res.data
            })
        })
}

//Call stkh Detail
// export const setStakeholderItemDetail = (param) => dispatch =>{
//     // console.log(param)
//     const url=gwUrl+converter(param)
//         fetch(url)
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res.data)           
//             dispatch({
//                 type:LOCATION_VIEW,
//                 payload:res.data
//             })
//         })
// }


// export const setStakeholderItemDetailBreadcrumb = (param) => dispatch =>{
//     // console.log(param)
//     const url=gwUrl+converter(param)
//     // console.log(url)
//         fetch(url)
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res.data)
//             dispatch({
//                 type:LOCATION_VIEW,
//                 payload:res.data 
//             })
//         })
// }

//Set Stakeholder Type Func
export const setStakehType = (param) => dispatch =>{
    // console.log(param)
    const url=gwUrl+converter(param)
    // console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:LOC_TYPE,
                payload:res.data
            })
            dispatch({           
                type: TOTAL_COUNT_LOCATION,
                payload: parseInt(res.totalCount)
            })
        })
}

//Set New Stakeh Type (After Delete)
export const newStakehType=(param)=>{
    return {
        type:LOC_TYPE,
        payload:param
    }
}

//Select Uri stakeholder
export const setStakehSel=(stakehSel)=>{
    return {
        type:LOC_SEL,
        payload:stakehSel
    }
}

//Select Name stakeholder
export const stakehSelObj=(param)=>{
    return {
        type:LOC_SEL_OBJ,
        payload:param
    }
}

//Layout 
export const setStakehViewTrue=(param)=>{
    return {
        type:LOC_VIEW,
        payload:param
    }
}

export const setStakehViewFalse=(param)=>{
    return {
        type:LOC_VIEW,
        payload:param
    }
}

//Fab
export const setShowFab=(param)=>{
    return {
        type:SHOW_FAB,
        payload:param
    }
}

//Stakeh Label Type
export const setStakehLabel=(param)=>{
    return {
        type:LOC_LABEL,
        payload:param
    }
}

//Stakeh Number Type
export const setStakehNumb=(param)=>{
    return {
        type:LOC_NUMB,
        payload:param
    }
}

//Search Status
export const searchStatus=(param)=>{
    return {
        type:SEARCH_STATUS,
        payload:param
    }
 }
 

 


