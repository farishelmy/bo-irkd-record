import React, { useState, useEffect } from "react"

export default function EditorHeader({ var: { secId, active, title}, value }) {
 
  const setIcon = title => {
    if (title.includes("Email")) {
      return "fab-email.svg"
    } else if (title.includes("Electronic")) {
      return "fab-upload.svg"
    } else {
      return "fab-tab.svg"
    }
  }
  
  const handleTab = () => {
    value(secId)
  }

  return (
    <div className='col-2 colContainer'>
      <div className={active ? "tab activeTab mx-auto" : "tab mx-auto"}>
        <img
          src={require(`../../../img/${setIcon(title)}`)}
          className={active ? "img-fluid desaturate" : "img-fluid"}
          onClick={handleTab}
          alt={title}
        />
      </div>       
    </div>
  )
}