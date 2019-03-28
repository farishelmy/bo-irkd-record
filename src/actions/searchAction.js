import { SET_SEARCH_PARAM } from "./types"

// export const basicSearch = searchKey => dispatch => {
//   dispatch({ type: BASIC_SEARCH, payload: searchKey })
// }
export const setSearchParam = searchParam => dispatch => {
  dispatch({ type: SET_SEARCH_PARAM, payload: searchParam })
}
// export const setNavToggle=(toggleVal, pageClass, navClass)=>dispatch=>{
//     if(toggleVal){
//         dispatch(setSideNavClass(navClass))
//         dispatch(setPageClass(pageClass))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }else{
//         dispatch(setSideNavClass('side-navbar'))
//         dispatch(setPageClass('page'))
//         dispatch({type:TOGGLE_SIDENAV,payload:toggleVal})
//     }
//  }
//  export const setActivePage=(pageName)=>{
//     return {
//         type:ACTIVE_PAGE,
//         payload:pageName
//     }
//  }
