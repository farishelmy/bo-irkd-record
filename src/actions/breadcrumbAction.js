import { 
    SET_BREADCRUMB, 
    INSERT_NEW_BREADCRUMB,
    SET_BREAD_IS_PARENT,
    CLEAR_NEWBREAD,
    PREV_NAV
} from './types'

export const setBread = (breadDetails) => dispatch=>{
    dispatch({
        type: SET_BREADCRUMB,
        payload: breadDetails
    })

}
export const setNewBread = (isParent,breadDetails) => dispatch=>{
    // console.log(isParent,breadDetails)
    dispatch({
        type: INSERT_NEW_BREADCRUMB,
        payload: breadDetails
    })
    dispatch({
        type: SET_BREAD_IS_PARENT,
        payload: isParent
    })
}
export const backPrev = (isPrev) => ({
  type: PREV_NAV,
  payload: isPrev
})

export const resetNav = () => ({
  type: CLEAR_NEWBREAD
})

