import React,{useState, useEffect} from 'react'
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";

export default function SecurityLevel({conf, onInputChange }) {

    const [optionSec, setOptionSec] = useState([])
    const [secVal, setsecVal] = useState()

    useEffect(() => {
        if (conf !== undefined) {
            onInputChange(conf)
            if (conf === "") {
                setsecVal(null)
            }
            else {
                setsecVal( [{ value: conf, label: conf }])
               
            }
            setOptionSec([
                { value: "Terbuka", label: "Terbuka" },
                { value: "Terhad", label: "Terhad" },
                { value: "Sulit", label: "Sulit" }
            ])
        }     
    }, [conf])

    const handleChange = (val) => {
        // console.log(val.label);
        onInputChange(val.label)
        setsecVal([
            {
              value: val.value,
              label: val.label
            }
        ])  
    };

    // const sendVal = () => {
    //     if (conf !== undefined) {
    //       onInputChange(secVal.label)
    //     } 
    // }


  return (
    <div>
        <FormGroup>
        <Label>Security Level: </Label>
        <Select
            name="comboBox"
            placeholder="Security Level"
            options={optionSec}
            onChange={handleChange}
            value={secVal}
            // onBlur={sendVal}
        />
        </FormGroup>    
    </div>
  )
}
