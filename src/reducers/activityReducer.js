import{
    LIST_ACTIVITY,
    LIST_ACTIVITY_DUE,
    SET_CARD_VIEW,
    SHOW_FAB,
    SELECT_SEL,
    WIZARD_PAGE,
    ACTIVITY_URI,
    ACTIVITY_NAME,
    ACTIVITY_DETAIL,
    SET_CONTAINER_LINE,
    SET_RECORD_STORE,
    TITLE_ACTIVITY_SEL,
    ACTIVITY_STATUS,
    CHECK_RESULT,
    GET_RESULT,
    PAGE_SIZE,
    TOTAL_COUNT,
    SHOW_MODAL_SEARCH,
    SHOW_ERR
} from '../actions/types'

const initialState={
    listActivity:[],
    activityStatus:[],
    listActivityDue: [],
    activityDet: [],
    activityUri: null,
    activityName: null,
    checkResult: null,
    wizardPage:"general",
    recordStore:[],
    result:[],
    containerLine:true,
    cardView:true,
    showFab:null,
    isSel:false,
    titleActivitySel:null,
    totalCount:null,
    pageSize:null,
    showSearchModal:false,
    showErr:false,

    
  
}

export default function(state = initialState, action){
    switch(action.type){
        case LIST_ACTIVITY:
        return {
            ...state,
            listActivity:action.payload,
        }

        case LIST_ACTIVITY_DUE:
        return {
            ...state,
            listActivityDue:action.payload,
        }
        
        case ACTIVITY_DETAIL:
        return {
            ...state,
            activityDet:action.payload,
        }

        case ACTIVITY_URI:
        return {
            ...state,
            activityUri:action.payload,
        }

        case ACTIVITY_NAME:
        return {
            ...state,
            activityName:action.payload,
        }

        case SET_CARD_VIEW:
        return {
            ...state,
            cardView:action.payload,
        }

        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload,
        }

        case SELECT_SEL:
        return {
            ...state,
            isSel:action.payload
        }         
        
        case WIZARD_PAGE:
        return {
            ...state,
            wizardPage:action.payload,
        }

        case SET_CONTAINER_LINE:
        return { 
            ...state,
            containerLine:action.payload,
        } 

        case SET_RECORD_STORE:
        return { 
            ...state,
            recordStore:action.payload,
        } 

        case TITLE_ACTIVITY_SEL:
        return {
            ...state,
            titleActivitySel:action.payload
        } 

        case ACTIVITY_STATUS:
        return {
            ...state,
            activityStatus:action.payload
        } 

        case CHECK_RESULT:
        return {
            ...state,
            checkResult:action.payload
        }

        case GET_RESULT:
        return {
            ...state,
            result:action.payload
        }

        case PAGE_SIZE:
        return {
            ...state,
            pageSize:action.payload
        } 

        case TOTAL_COUNT:
        return {
            ...state,
            totalCount:action.payload
        }

        case SHOW_MODAL_SEARCH:
        return {
            ...state,
            showSearchModal:action.payload
        }

        case SHOW_ERR:
        return {
            ...state,
            showErr:action.payload
        }

        default:
        return state
    }
}