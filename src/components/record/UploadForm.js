import React,{ useState,useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { FormGroup, Label, Input } from "reactstrap"

export default function UploadForm({conf,onInputChange}) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
    const [file, setFile] = useState([])

    // useEffect(() => {
    //     if (conf !== undefined) {
    //         setFile(acceptedFiles) 
    //         onInputChange(acceptedFiles)
    //     }     
    //   }, [conf])
    
    const files = acceptedFiles.map(file => (
        <div key={file.path}>
        {file.path} - {file.size} bytes
        </div>
    ))

  
    onInputChange(acceptedFiles)
    // console.log(file)

    

  return (
    <FormGroup>
    <Label>Files</Label>         
        <div  {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
            {   
                acceptedFiles.length!==0?
                <div className="dz-message">
                    <img src={require('../../img/document.svg')} alt={document} className="p-2 img-fluid img-scale" />{files}<p>Or</p>
                    <p>Drag 'n' drop files here, or click to browse files</p></div>
                    :
                <div className="dz-message">
                    <p>Drag 'n' drop files here, or click to browse files</p>                     
                </div> 
            }       
        </div>    
    </FormGroup>              
  )
}
