import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { FormGroup, Label, Form } from "reactstrap"

export default function DateField({ conf: { param, title, format, query, incoming, name, value }, onInputChange }) {
  // const [startDateVal, setStartDate] = useState(query !== undefined ? moment(query.value1, "DD/MM/YYYY") : moment(value, "DD/MM/YYYY"))
  // const [endDateVal, setEndDate] = useState(query !== undefined ? moment(query.value2, "DD/MM/YYYY") :  moment(value, "DD/MM/YYYY"))
  const [startDateVal, setStartDate] = useState(query !== undefined ? moment(query.value1, "DD/MM/YYYY") : moment())
  const [endDateVal, setEndDate] = useState(query !== undefined ? moment(query.value2, "DD/MM/YYYY") :  moment())

  // useEffect(() => {
  //   // if (query!==undefined){
  //   //   setStartDate(query.value1, "DD/MM/YYYY")
  //   //   setEndDate(query.value2, "DD/MM/YYYY")
  //   //   console.log(value)
  //   //   console.log(query)
  //   // }

  //   if(value===""){
  //     setStartDate(moment.isValid())
  //     setEndDate(moment.isValid())
  //   }
  //   else{
  //     setStartDate(moment(value, "DD/MM/YYYY"))
  //     setEndDate(moment(value, "DD/MM/YYYY"))
  //   }
    
    
    
  // }, [value])
  
  const changeStartDate = startDate => {
    if (startDate.isAfter(endDateVal)) {
      setEndDate(startDate)
    }
    setStartDate(startDate)
  }
  const changeEndDate = endDate => {
    if (startDateVal.isAfter(endDate)) {
      setEndDate(startDateVal)
    } else {
      setEndDate(endDate)
    }
  }

  const sendVal = () => {
    if (incoming === undefined) {
      const queParam = {
        title,
        format,
        query: { op: "BETWEEN", field: param, value1: moment(startDateVal).format("DD/MM/YYYY"), value2: moment(endDateVal).format("DD/MM/YYYY") }
      }
      onInputChange(query !== undefined ? { ...queParam, idx: query.idx } : queParam)
    } else {
      const dateVal = moment(startDateVal).format("DD/MM/YYYY, HH:mm:ss")
      onInputChange({ name, value: dateVal.split(",") })
    }
  }

  return (
    <FormGroup>
      <Label>{title}</Label>
      <Form inline onSubmit={sendVal}>
        <FormGroup>
          <DatePicker
            placeholderText='Date Start'
            selected={startDateVal===""?null:startDateVal}
            onChange={changeStartDate}
            onBlur={sendVal}
            className='form-control'
            dateFormat='DD/MM/YYYY'
            selectsStart
            startDate={startDateVal}
            endDate={endDateVal}
          />
        </FormGroup>

        {incoming === undefined ? (
          <FormGroup>
            <DatePicker
              placeholderText='Date End'
              selected={endDateVal===""?null:endDateVal}
              onChange={changeEndDate}
              onBlur={sendVal}
              className='form-control ml-3'
              dateFormat='DD/MM/YYYY'
              selectsEnd
              startDate={startDateVal}
              endDate={endDateVal}
            />
          </FormGroup>
        ) : (
          ""
        )}
      </Form>
    </FormGroup>
  )
}