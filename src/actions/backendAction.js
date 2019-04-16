import {
  RECORD_LIST,
  RECORD_TYPE_LIST,
  SAVED_SEARCH_LIST,
  CLASSIFICATION_LIST,
  SEARCH_RECTYPE,
  SET_OBJLIST,
  SET_ADDFIELD_LIST,
  SET_REC_CONF,
  SET_REC_ACC,
  SET_SEC_CAV
} from "./types"
import { gwUrl } from "../config/appConf"
import { converter } from "../utilis/queryStringConverter"

export const recFetch = (fetchParam, paging) => dispatch => {
  const url = `${gwUrl}${converter(fetchParam)}&${converter(paging)}`

  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      dispatch({ type: RECORD_LIST, payload: response })
    })
}
export const recTypeFetch = (fetchParam, incoming) => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      if (incoming === "createRec") {
        dispatch({ type: RECORD_TYPE_LIST, payload: response })
      } else {
        dispatch({ type: SEARCH_RECTYPE, payload: response })
      }
    })
}
export const fetchSavedSearch = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      dispatch({ type: SAVED_SEARCH_LIST, payload: response })
    })
}
export const fetchClassList = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      dispatch({ type: CLASSIFICATION_LIST, payload: response })
    })
}
export const fetchObjList = (fetchParam, paging) => dispatch => {
  // const url = gwUrl + converter(fetchParam)
  const url = `${gwUrl}${converter(fetchParam)}&${converter(paging)}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      dispatch({ type: SET_OBJLIST, payload: response })
    })
}
export const fetchAdditionalField = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      dispatch({ type: SET_ADDFIELD_LIST, payload: response })
    })
}
export const recDelete = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      console.log(res)
      // dispatch({ type: SET_ADDFIELD_LIST, payload: response })
    })
}
export const recDetails = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  // console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, formProperty, ...response } = res
      const data = response.data
      const newObj = data.reduce((total, cmp) => {
        // if (cmp.fieldType === "fTab") {
        if (cmp.fieldType.includes("fTab")) {
          total.push({ ...cmp, child: [] })
        } else {
          total[total.length - 1].child.push({ ...cmp })
        }
        return total
      }, [])
      dispatch({ type: SET_REC_CONF, payload: { recProps: formProperty, cmp: newObj } })
    })
}
export const recSave = fetchParam => dispatch => {
  console.log(fetchParam)
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      console.log(res)
      // dispatch({ type: SET_ADDFIELD_LIST, payload: response })
    })
}
export const recAcc = fetchParam => dispatch => {
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, secLevel, ...response } = res
      // const data = response.data
      // const newObj = data.reduce((total, cmp) => {
      //   // if (cmp.fieldType === "fTab") {
      //   if (cmp.fieldType.includes("fTab")) {
      //     total.push({ ...cmp, child: [] })
      //   } else {
      //     total[total.length - 1].child.push({ ...cmp })
      //   }
      //   return total
      // }, [])
      dispatch({ type: SET_REC_ACC, payload: { secLevel , sec: response.data } })
    })
}
export const recSecCav = fetchParam => dispatch => {
  // console.log(fetchParam)
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      // console.log(res)
      dispatch({ type: SET_SEC_CAV, payload: response.data })
    })
}
export const addAccessControl = fetchParam => dispatch => {
  console.log(fetchParam)
  const url = gwUrl + converter(fetchParam)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      const { success, message, ...response } = res
      console.log(res)
      // dispatch({ type: SET_ADDFIELD_LIST, payload: response })
    })
}
 

