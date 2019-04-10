import React, { useState, useEffect } from "react"

import DateField from "../../dynComp/DateField"
import DateField2 from "../../dynComp/DateField2"
import TextField from "../../dynComp/TextField"
import TextModal from "../../dynComp/TextModal"
import UploadField from "../../dynComp/UploadField"
import { Button, FormGroup, Col } from "reactstrap"

export default function TabEditor({ conf, sendFormVal, accConf}) {
  const [tabTitle, setTabTitle] = useState("")
  const [formCmp, setFormCmp] = useState([])
  const [formVal, setFormVal] = useState({})
  const [itemVar, setItemVar] = useState([])

  useEffect(() => {
    if (conf !== undefined) {
      setTabTitle(conf.name)
      const childTempered = conf.child.map(itm => ({ ...itm, incoming: "dynForm" }))
      console.log(childTempered)
      setFormCmp(childTempered)      
    }     
  }, [conf])

   
  const setVal = e => {
    setFormVal({ ...formVal, [e.name]: e.value })
  }

  const submitForm = () => {
    // console.log(sendFormVal)
    sendFormVal(formVal)
  }

  const field = formCmp.map((itm, idx) => {
    switch (itm.fieldType) {
      case "fTextArea":
        return (
          <TextField
            key={idx}
            conf={{ title: itm.fieldLabel, textType: "textarea", incoming: itm.incoming, name: itm.name, value:itm.value }}
            onInputChange={setVal}
          />
        )
      case "fContainer":
        return (
          <TextModal
            key={idx}
            conf={{ title: itm.fieldLabel, modalType: "container", incoming: itm.incoming, name: itm.name, value:itm.value }}
            onInputChange={setVal}
          />
        )
      case "fObject":
        return (
          <TextModal
            key={idx}
            conf={{ title: itm.fieldLabel, modalType: "location", incoming: itm.incoming, name: itm.name, value:itm.value }}
            onInputChange={setVal}
          />
        )
      case "fDateTime":
        return (
          <DateField
            key={idx}
            conf={{ title: itm.fieldLabel, incoming: itm.incoming, name: itm.name, value:itm.value }}
            onInputChange={setVal}
            onInputChange={setVal}
          />
        )
      case "fString":
        return (
          <TextField 
            key={idx} 
            conf={{ title: itm.fieldLabel, textType: "text", incoming: itm.incoming, name: itm.name, value:itm.value }} 
            onInputChange={setVal} 
          />
        )
      case "fDate":
        return (
          <DateField2
            key={idx}
            conf={{ title: itm.fieldLabel, incoming: itm.incoming, name: itm.name, value:itm.value }}
            onInputChange={setVal}
            // onInputChange={setVal}
          />
        )
      // case "fDate":
      //   return <label key={idx}>{itm.fieldLabel}</label>
      case "fFile":
        return (
          <UploadField
            key={idx}
            conf={{ title: itm.fieldLabel, incoming: itm.incoming, name: itm.name }}
            onInputChange={setVal}             
          />
        )
      default:
        break
    }
  })

  return (
    <div>
      <Col>
      <h1 className='h3 display text-primary text-center'>{tabTitle}</h1>
        {field}
        <FormGroup>
          <Button className='btn btn-primary' onClick={submitForm}>
            Save
          </Button>
        </FormGroup>
      </Col>
    </div>
  )
}
