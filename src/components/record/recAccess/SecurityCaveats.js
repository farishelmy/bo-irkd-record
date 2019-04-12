import React, {useState, useEffect} from 'react'
import Select from "react-select";
import Tooltip from "rc-tooltip";

import { FormGroup, Label, Col, Button } from "reactstrap";


export default function SecurityCaveats({conf, onInputChange }) {
    const [caveatsOpt, setCaveatsOpt] = useState([])
    const [caveatsVal, setCaveatsVal] = useState()
    const [addCaveats, setAddCaveats] = useState()
    const [caveats, setCaveats] = useState(conf)
    // console.log(caveats)

    useEffect(() => {
        if (conf !== undefined) {
            const opt = conf.map(itm => ({ value: itm.caveatUri, label:itm.caveatAbv}))
            // console.log(opt)
            setCaveatsOpt(opt)             
            setCaveatsVal(opt)
        }     
    }, [conf])

    const handleChangeCaveats= idx => selected => {
        const {label,value}  = selected 
        const newCaveats = [...caveats]
        newCaveats[idx]={
            caveats: caveats[idx], 
            caveatUri: value,
            caveatAbv: label,            
            caveatDesc: caveats[idx].caveatDesc,
            sort_order: caveats[idx],
          }    
        setCaveats(newCaveats)
        caveatsVal([
            {
              value: value,
              label: label
            }
        ])    
    }
 
    const handleAddCaveats = () => {
        onInputChange()       
        const item = {
            sort_order: caveats.length + 1,                         
        }
        setCaveats([...caveats,item])       
    }

    const handleRemoveCaveats = idx => ()  =>{

        console.log(idx)
        const newCaveats = [...caveats]    
        newCaveats.splice(idx, 1)
        setCaveats(newCaveats) 
    }


  return (
    <div>
    <FormGroup>
        <div className="row">
            <div className="col-auto mr-auto form-group ">
            <label>Active Security Caveats:</label>
            </div>

            <div className="col-auto">
            <span>
                <Tooltip
                    placement="top"
                    overlay={
                        <div
                        style={{
                            height: 20,
                            width: "100%",
                            textAlign: "center"
                        }}
                        >
                        Add Security Caveats
                        </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                >
                <img
                    src={require("../../../img/addBtn.svg")}
                    alt="addTask"
                    className="btn btn-link"
                    onClick={handleAddCaveats}
                />
                </Tooltip>
            </span>
            </div>
        </div>

        <div className="card bg-light">
            <table className={caveats.length!==0?"table table-hover mb-3":"d-none"}>
            {/* <table className="table table-hover mb-3"> */}

            <thead>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">Security Caveats</th>
                <th scope="col">Description</th>
                </tr>
            </thead>

            <tbody>
                {caveats.map((itm,idx)=> ( 
                    <tr key={idx}>
                    <td>{idx}</td>
                    <td>
                        <Select  
                            placeholder="Caveats" 
                            options={caveatsOpt}
                            onChange={handleChangeCaveats(idx)}
                            value={caveatsVal[idx]}
                        />
                    </td>
                    <td>{itm.caveatDesc}</td>
                    <td>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleRemoveCaveats(idx)}>
                        Remove
                        </button>
                    </td>
                    </tr>
                ))}                            
            </tbody>
            </table>
            <div className={caveats.length===0?"card-body":"d-none"}>
                <p className="card-text">There are no items to view.</p>
            </div>
        </div>
        </FormGroup>      
    </div>
  )
}
