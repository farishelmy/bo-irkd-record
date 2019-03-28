import {
  // BASIC_SEARCH,
  SET_SEARCH_PARAM,
  SAVED_SEARCH_LIST,
  CLASSIFICATION_LIST,
  SEARCH_RECTYPE,
  SET_OBJLIST,
  SET_ADDFIELD_LIST
} from "../actions/types"

const initialState = {
  // basicKey: null,
  searchParam: null,
  savedSearchList: [],
  classList: [],
  recTypeList: [],
  objList: [],
  addFieldList: []
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    // case BASIC_SEARCH:
    //   return { ...state, basicKey: payload }
    case SET_SEARCH_PARAM:
      return { ...state, searchParam: payload }
    case SAVED_SEARCH_LIST:
      return { ...state, savedSearchList: payload }
    case CLASSIFICATION_LIST:
      return { ...state, classList: payload }
    case SEARCH_RECTYPE:
      return { ...state, recTypeList: payload }
    case SET_OBJLIST:
      return { ...state, objList: payload }
    case SET_ADDFIELD_LIST:
      return { ...state, addFieldList: payload }

    default:
      return state
  }
}
