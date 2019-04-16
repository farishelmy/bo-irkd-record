import React,{useState, useEffect} from "react";
import Select from "react-select";
import Tooltip from "rc-tooltip";

import { FormGroup, Label, Col, Button } from "reactstrap";
import CustomizeAccess from '../recAccess/CustomizeAccess'




export default function AccessControl({ conf, onInputChange }) {
    const [access, setAccess] = useState(conf)
    const [custom, setCustom] = useState(false)
    const [accessVal, setAccessVal] = useState([])

    // console.log(access)
    // console.log(custom)

    useEffect(() => {
        if (conf !== undefined) {
      
             
        }     
    }, [conf])

    
    const handlechange =  idx => () =>{  
      const selItm=access.filter((itm,key)=>itm[key]===itm[idx]) 
      // console.log(access[idx])
      // console.log(selItm)
      setCustom(true)  
      setAccessVal(access[idx])
    }

    const handleClose=()=>{
        setCustom(!custom)
    }

  return (
    <div>
      <div className="row">
        <div className="col-auto mr-auto form-group ">
          <label>Access Control:</label>
        </div>

        {/* <div className="col-auto">
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
                    Add Access Control
                    </div>
                }
                arrowContent={<div className="rc-tooltip-arrow-inner" />}
            >
              <img
                src={require("../../../img/addBtn.svg")}
                alt="addTask"
                className="btn btn-link"
                // onClick={handleAddAccess}
              />
            </Tooltip>
          </span>
        </div> */}
      </div>
      <div className="card bg-light">
        <table className="table table-hover mb-3">
          <thead>
            <tr>
              {/* <th scope="col">No.</th> */}
              <th scope="col">Access To</th>
              <th scope="col">Details</th>
            </tr>
          </thead>

          {access.map((itm, idx) => (
            <tbody key={idx} onClick={handlechange(idx)}>
              <tr>
                {/* <td>1</td> */}
                <td>{itm.accessTo}</td>
                {/* <td>                
                    <Select 
                        key={idx}
                        placeholder="New Group"
                        // value={this.state.value}
                        isMulti
                        styles={styles}
                        // isClearable={this.state.value.some(v => !v.isFixed)}
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        // onChange={this.onChange}
                        options={optionLoc}
                    />
                </td> */}
                <td>{itm.details}</td>
              </tr>
            </tbody>
          ))}
        </table>
        {custom === true ? (
          <CustomizeAccess
            modalShow={custom}
            toggleClose={handleClose}
            conf={access}
            accessCont={accessVal}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
