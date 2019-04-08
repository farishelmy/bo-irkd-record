import React, { useState } from "react"
import { FormGroup, Label, Input } from "reactstrap"
export default function TextField({ conf: { param, title, format, query, textType, incoming, name, value }, onInputChange }) {
  const [inputVal, setInputVal] = useState(query !== undefined ? query.value1 : value)
  const inputType = textType !== undefined ? textType : "text"

  const changeVal = e => {
    setInputVal(e.target.value)
  }
  const sendVal = () => {
    if (incoming === undefined) {
      const queParam = { title, format, query: { op: "EQUALS", field: param, value1: inputVal } }
      onInputChange(query !== undefined ? { ...queParam, idx: query.idx } : queParam)
    } else {
      onInputChange({ name, value: inputVal })
    }
  }

  return (
    <FormGroup>
      <Label>{title}</Label>
      <Input
        onChange={changeVal}
        onBlur={sendVal}
        // name={custom_field_id}
        type={inputType}
        value={inputVal}
        placeholder={`Insert Value for ${title}`}
        // maxLength={length === 0 ? "" : length}
      />
    </FormGroup>
  )
}
