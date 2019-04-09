import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { FormGroup, Label, Form } from "reactstrap"

export default function DateField({ conf: { param, title, format, query, incoming, name, value }, onInputChange }) {
  const [startDateVal, setStartDate] = useState(query !== undefined ? moment(value, "DD/MM/YYYY") : moment())
  
    const handleDateChange=(date)=>{
        // console.log(value)
        setStartDate(date) 
    }    

  const sendVal = () => {
    if (incoming === undefined) {
        const dateVal = moment(startDateVal).format("DD/MM/YYYY, HH:mm:ss")
        onInputChange({ name, value: dateVal.split(",")})
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
            selected={startDateVal}
            onChange={handleDateChange}
            onBlur={sendVal}
            className='form-control'
            dateFormat='DD/MM/YYYY'  
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </FormGroup>     
      </Form>
    </FormGroup>
  )
}