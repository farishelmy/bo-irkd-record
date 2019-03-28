import React from "react"
import searchIcon from "../../img/search.svg"
export default function ThumbCard({ isSel, title, desc, getDetails, searchId, isLeaf }) {
  // console.log(date_created)

  //   const iconType =
  //     record_type_icon === "pdf" ||
  //     record_type_icon === "yellowfile" ||
  //     record_type_icon === "emailAttachment" ||
  //     record_type_icon === "attachment" ||
  //     record_type_icon === "search" ||
  //     record_type_icon === "doc"
  //       ? record_type_icon
  //       : record_type_icon === "reddoc"
  //       ? "document"
  //       : "default"

  const toggleBg = isSel ? "bg-primary" : "",
    bgLight = isSel ? "bg-light" : "",
    textColor = isSel ? "text-light" : "text-muted"

  const handleClick = e => {
    getDetails({ searchId, title, isLeaf })
    // console.log(recTypeId)
  }
  return (
    <div className='col-lg-4 mb-4'>
      <div className='card data-usage' onClick={handleClick}>
        <div className='row d-flex align-items-center'>
          <div className='col-sm-4'>
            <img src={require(`../../img/search.svg`)} className='img-card' alt='...' />
          </div>
          <div className='col-sm-8'>
            <span className='text-primary'>{title}</span>
            <hr className='mt-3 mb-2' />
            <small>{desc}</small>
          </div>
        </div>
      </div>
    </div>
  )
}
