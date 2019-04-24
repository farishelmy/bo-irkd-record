import React from 'react'
import { Input } from 'reactstrap'


export default function Search({handleChange}) {
    const handle = e =>{
        handleChange(e.target.value)
    }
  return (
    
      <Input
            name="searchName"
            className="form-control"
            onChange={handle}
            placeholder="Search Name"
        />
    
  )
}
