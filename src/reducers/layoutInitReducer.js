import{PAGE_CLASS,TOGGLE_SIDENAV,SIDENAV_CLASS,ACTIVE_PAGE,SHOW_FAB} from '../actions/types'

const initialState={
    pageClass:'page',
    activePage:'dashboard',
    toggleSideNav:false,
    navBarClass:'side-navbar',
    showFab:false
}

export default function(state = initialState, action){
    switch(action.type){
        case PAGE_CLASS:
        return {
            ...state,
            pageClass:action.payload,
        }
        case TOGGLE_SIDENAV:
        return {
            ...state,
            toggleSideNav:action.payload
        }
        case SIDENAV_CLASS:
        return {
            ...state,
            navBarClass:action.payload
        }
        case ACTIVE_PAGE:
        return {
            ...state,
            activePage:action.payload
        }
        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload
        }
        default:
        return state
    }
}