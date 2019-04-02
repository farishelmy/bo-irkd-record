import { 
    SET_BREADCRUMB,
    INSERT_NEW_BREADCRUMB,
    SET_BREAD_IS_PARENT,
    CLEAR_NEWBREAD,
    PREV_NAV
 } from '../actions/types'

const initialState = {
    breadList:[{
        id:'home',
        label:'Home', 
        activePage:'dashboard',
        isActive:false
        //  cls:'breadcrumb-item'
        }],
    newBread:{},
    isParent:false,
    prevNav:false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case INSERT_NEW_BREADCRUMB:
    return {
        ...state,
        newBread:action.payload
    }
    case SET_BREADCRUMB:
    return {
        ...state,
        breadList:action.payload
    }
    case SET_BREAD_IS_PARENT:
    return {
        ...state,
        isParent:action.payload
    }
    case CLEAR_NEWBREAD:
    return{
        ...state,
        newBread:{}
    }
    case PREV_NAV:
    return{
        ...state,
        prevNav:action.payload
    }
    
  default:
    return state
  }
}
