import { TOTAL_YEAR, TOTAL_MONTH, TOTAL_CREATED, RECORD_YEAR, RECORD_TYPES, RECORD_MONTH } from '../actions/types'

const initialState = {
  totalYear:[],
  totalMonth:[],
  totalCreated: [],
  recordYear: [],
  recordMonth: [],
  recordTypes:[],
}

export default (state = initialState, action) => {
    switch (action.type) {

    case TOTAL_YEAR:
        return {
            ...state,
            totalYear:action.payload
        }
    case TOTAL_MONTH:
        return {
            ...state,
            totalMonth:action.payload
        }
    case TOTAL_CREATED:
        return {
            ...state,
            totalCreated:action.payload
        }
    case RECORD_YEAR:
        return {
            ...state,
            recordYear: action.payload
        }
    case RECORD_TYPES:
        return {
            ...state,
            recordTypes:action.payload
        }
    case RECORD_MONTH:
        return {
            ...state,
            recordMonth: action.payload
        }

  default:
    return state
  }
}
