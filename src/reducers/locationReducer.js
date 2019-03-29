import {LOC_TYPE,
LOC_SEL,  
LOC_SEL_OBJ, 
LOC_VIEW,
SHOW_FAB,  
LOC_LABEL,  
LOC_NUMB,  
PAGE_SIZE_LOCATION,  
TOTAL_COUNT_LOCATION,  
LOCATION_VIEW,  
LOCATION_MEMBER, 

} from '../actions/types'


const initialState={ 
    locType:[],  //List Type Stakeholder
    locSel:'null',   //Select Stakeholder    
    locObj:'null',    //detail location
    locationDetail:[], //detail location
    locationMember:[], //member list
    locView: false, //layout card to grid
    showFab:false,  //Fab
    locLabel: null, //Stakeh Label
    locNumb: null, //Stakeh Number Type  
    pageSize: 10, //paging
    totalCount: null //paging
   

}

export default function(state = initialState, action){
    switch(action.type){
        case LOC_TYPE:
        return {
            ...state,
            locType:action.payload,
        }    
        case LOC_SEL:
        return {
            ...state,
            locSel:action.payload
        } 
        case LOC_SEL_OBJ:
        return {
            ...state,
           locObj:action.payload
        }         
        case LOC_VIEW:
        return {
            ...state,
            locView:action.payload
        } 
        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload
        } 
        case LOC_LABEL:
        return {
            ...state,
            locLabel:action.payload
        }    
        case LOC_NUMB:
        return {
            ...state,
            locNumb:action.payload
        }    
        case PAGE_SIZE_LOCATION:
        return {
            ...state,
            pageSize:action.payload
        } 
        case TOTAL_COUNT_LOCATION:
        return {
            ...state,
            totalCount:action.payload
        }       
        case LOCATION_VIEW:
        return { ...state,
            locationDetail:action.payload,
        }
        case LOCATION_MEMBER:
        return { ...state,
            locationMember:action.payload,
        }     
        default:
        return state
    }
}