import {
    RECORD_TYPES,
    TOTAL_MONTH,
    TOTAL_YEAR,
    TOTAL_CREATED,
    RECORD_MONTH,
    RECORD_YEAR
} from './types'
    
import {gwUrl} from '../config/appConf'
import {converter} from '../utilis/queryStringConverter'

export const getRecordTypes = recTypesParam => dispatch => {
    const url = gwUrl + converter(recTypesParam);
    // const url=`${gwUrl}/searchrecord?param=${+converter(totalRecParam)}`
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        //    console.log(res)
        dispatch({
          type: RECORD_TYPES,
          payload: res.data
        });
      });
  };

  export const getTotalMonth = totalMonParam => dispatch => {
    const url = gwUrl + converter(totalMonParam);
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: TOTAL_MONTH,
          payload: res.data
        });
      });
  };

  export const getTotalYear = totalYearParam => dispatch => {
    const url = gwUrl + converter(totalYearParam);
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        dispatch({
          type: TOTAL_YEAR,
          payload: res.data
        });
      });
  };

  export const getTotalCreated = totalCreaParam => dispatch => {
    const url = gwUrl + converter(totalCreaParam);
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch({
          type: TOTAL_CREATED,
          payload: res.totalRecordCreated
        });
      });
  };

  export const getRecMonth = recMonthParam => dispatch => {
    const url = gwUrl + converter(recMonthParam);
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch({
          type: RECORD_MONTH,
          payload: res.totalRecordCreated
        });
      });
  };

  
export const getRecYear = recYearParam => dispatch => {
    const url = gwUrl + converter(recYearParam);
  
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch({
          type: RECORD_YEAR,
          payload: res.totalRecordCreated
        });
      });
  };