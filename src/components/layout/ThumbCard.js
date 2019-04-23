import React from "react"

export default function ThumbCard({ record_type_icon, isSel, title, date_created, getDetails, recId, isContainer, isChild, getSelected, revuri, revisionnumber, datemodified, preserve }) {
  // console.log(date_created)

  const iconType =
    record_type_icon === "pdf" ||
    record_type_icon === "yellowfile" ||
    record_type_icon === "emailAttachment" ||
    record_type_icon === "attachment" ||
    record_type_icon === "search" ||
    record_type_icon === "doc"
      ? record_type_icon
      : record_type_icon === "reddoc"
      ? "document"
      : "default"

  const subIcon = isContainer && isChild ? "fab-both" : isChild ? "fab-child" : isContainer ? "fab-parent" : "fab-none"

  const toggleBg = isSel ? "bg-primary" : "",
    bgLight = isSel ? "bg-light" : "",
    textColor = isSel ? "text-light" : "text-muted",
    titleColor = isSel ? "text-light" : "text-primary"

  const handleClick = e => {
    if(revisionnumber!==undefined){
      getSelected(revuri, revisionnumber)
    }
    else{ 
      getDetails(recId, title)
    }
    // console.log(recId, recType, recProps)
  }
  return (
    <div className='col-6 col-md-4 col-lg-2 col-xl-2 mb-4' onClick={handleClick}>
      <div className={`card income text-center ${toggleBg}`}>
        <div className='icon'>
          <div className='container-ovr'>
            <img src={require(`../../img/${iconType}.svg`)} alt={iconType} className='img-card' />
            <div className='bottomright'>
              <img src={require(`../../img/${subIcon}.svg`)} alt={iconType} className='img-card-overlay' />
            </div>
          </div>
        </div>
        <hr className={`mb-2 ${bgLight}`} />
        <span className={`${titleColor} text-truncate`}>{revisionnumber===undefined?title:revisionnumber}</span>
        {date_created !== undefined ? <p className={textColor}>Created: {date_created}</p> : ""}
        {datemodified !== undefined ? <p className={textColor}>Date Modified: {datemodified}</p> : "" }
      </div>
      {/* <div className={`card ${toggleBg}`} onClick={handleClick}>
        <div className='text-center'>
          <div className='container-ovr'>
            <img src={require(`../../img/${iconType}.svg`)} alt={iconType} className='img-card mt-4' />
            <div className='bottomright'>
              <img src={require(`../../img/${subIcon}.svg`)} alt={iconType} className='img-card-overlay' />
            </div>
          </div>
        </div>

        <div className='card-body'>
          <hr className={`mt-0 ${bgLight}`} />
          <p className={`card-title mb-1 font-weight-bold text-truncate ${textColor}`}>{title}</p>
          {date_created !== undefined ? (
            <p className='card-text text-truncate'>
              <small className={textColor}>Created: {date_created}</small>
            </p>
          ) : (
            ""
          )}
        </div>
      </div> */}
    </div>
  )
}
