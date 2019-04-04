import React, { useState, useEffect } from "react"

export default function ItmCard({ conf, title, getChild, value, getDetails }) {
  const { iconCls } = conf
  const sendDetails = e => {
    const itmProps = e.target.getAttribute("data-name")
    if (itmProps === "getChild") {
      getChild({ ...conf, title })
    } else {
      if (itmProps !== null) {
        getDetails(value)
      }
    }
  }
  

  const iconType =
    iconCls === "pdf" ||
    iconCls === "yellowfile" ||
    iconCls === "emailAttachment" ||
    iconCls === "attachment" ||
    iconCls === "search" ||
    iconCls === "doc"
      ? iconCls
      : iconCls === "reddoc"
      ? "document"
      : "search"
  const showAdd = conf.incoming !== undefined ? (conf.uri.includes("c") ? false : true) : true
  return (
    <div className='d-flex justify-content-between align-items-center recListMenu' data-name='getChild' onClick={sendDetails}>
      <div className='left-col d-flex align-items-center'>
        <div className='icon mr-2 d-flex align-items-start' data-name='addBtn'>
          {showAdd ? <i className='fa fa-plus mr-2' data-name='addBtn' /> : ""}
          <img src={require(`../../img/${iconType}.svg`)} className='listIcn' alt={iconType} />
        </div>
        <div>
          <p className='title text-primary mb-0'>{title}</p>
        </div>
      </div>

      {!conf.leaf ? (
        <div className='right-col text-right' data-name='getChild'>
          <i className='fa fa-arrow-right text-primary' data-name='getChild' />
          <i className='fa fa-chevron-right' data-name='getChild' />
        </div>
      ) : conf.incoming !== undefined ? (
        conf.iconCls === "cs-has-rec" ? (
          <div className='right-col text-right' data-name='getChild'>
            <i className='fa fa-arrow-right text-primary' data-name='getChild' />
            <i className='fa fa-chevron-right' data-name='getChild' />
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  )
}
