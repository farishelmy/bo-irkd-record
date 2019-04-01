import { 
    SHOW_SUB_BTN
} from './types'

export const changeSubBtn=(param)=>{
    return {
        type:SHOW_SUB_BTN,
        payload:param
    }
}