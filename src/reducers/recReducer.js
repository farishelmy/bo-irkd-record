import { RECORD_LIST, RECORD_TYPE_LIST, SET_REC_CONF, SET_REC_ACC, SET_SEC_CAV, SET_MULTI_FAB, ENABLE_MULTI_SEL, ENABLE_SEL_ALL, SET_SHOW_EMAIL } from "../actions/types"

const initialState = {
  recList: [],
  recTypeList: [],
  recConf: [],
  recAcc: [],
  recSecCav:[],
  showEmail:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECORD_LIST:
      return { ...state, recList: payload }
    case RECORD_TYPE_LIST:
      return { ...state, recTypeList: payload }
    case SET_REC_CONF:
      return { ...state, recConf: payload }
    case SET_REC_ACC:
      return { ...state, recAcc: payload }
    case SET_SEC_CAV:
      return { ...state, recSecCav: payload }
    case SET_SHOW_EMAIL:
      return { ...state, showEmail: payload }
    // case SET_MULTI_FAB:
    //   return { ...state, showFabMulti: payload }
    // case ENABLE_MULTI_SEL:
    //   return { ...state, isMultiSel: payload }
    // case ENABLE_SEL_ALL:
    //   return { ...state, isSelAll: payload }
    default:
      return state
  }
}
