import React, { useState } from "react"
import NumberFormat from "react-number-format"
import { FormGroup, Label, Form, Input } from "reactstrap"

export default function NumField({ conf: { param, title, format, query }, onInputChange }) {
  const [startNumVal, setStartVal] = useState(query !== undefined ? query.value1 : "")
  const [endNumVal, setEndVal] = useState(query !== undefined ? query.value2 : "")

  const changeStartVal = ({ floatValue }) => {
    if (floatValue > endNumVal) {
      setEndVal(floatValue)
    }
    setStartVal(floatValue)
  }
  const changeEndVal = ({ floatValue }) => {
    if (startNumVal > floatValue) {
      setEndVal(startNumVal)
    } else {
      setEndVal(floatValue)
    }
  }

  const sendVal = () => {
    const queParam = {
      title,
      format,
      query: { op: "BETWEEN", field: param, value1: startNumVal, value2: endNumVal }
    }
    onInputChange(query !== undefined ? { ...queParam, idx: query.idx } : queParam)
  }

  return (
    <FormGroup>
      <Label>{title}</Label>
      <Form inline onSubmit={sendVal}>
        <FormGroup>
          <NumberFormat
            className={"mr-4"}
            name={"startNum"}
            onValueChange={changeStartVal}
            customInput={Input}
            onBlur={sendVal}
            type={"text"}
            value={startNumVal}
            placeholder={"Insert number from"}
            decimalScale={0}
          />
        </FormGroup>
        <FormGroup>
          <NumberFormat
            name={"endNum"}
            onValueChange={changeEndVal}
            customInput={Input}
            onBlur={sendVal}
            type={"text"}
            value={endNumVal}
            placeholder={"Insert number to"}
            decimalScale={0}
          />
        </FormGroup>
      </Form>
    </FormGroup>
  )
}
