import React,{ useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { FormGroup, Label, Input } from "reactstrap"

export default function UploadForm({onInputChange}) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
   
    const files = acceptedFiles.map(file => (
        <div key={file.path}>
        {file.path} - {file.size} bytes
        </div>
    ))

    onInputChange(acceptedFiles)
    // console.log(acceptedFiles)

   
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
