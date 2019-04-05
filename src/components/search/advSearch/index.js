import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import update from "immutability-helper"

import { fetchAdditionalField } from "../../../actions/backendAction"
import { setSearchParam } from "../../../actions/searchAction"
import { setActivePage } from "../../../actions/layoutInitAction"
import { searchAttr } from "../../../model/recProp"
import { setNewBread } from "../../../actions/breadcrumbAction"

import TextField from "../../dynComp/TextField"
import DateField from "../../dynComp/DateField"
import ItemLising from "./ItemLising"
import NumField from "../../dynComp/NumField"
import ComboField from "../../dynComp/ComboField"

export class index extends Component {
  constructor() {
    super()
    this.state = {
      searchAttrList: [],
      childAttrList: [],
      searchVal: null,
      attrType: null,
      queryParam: [],
      inputText: null,
      toggleAddBtn: false,
      disableAdd: true
    }
  }
  componentDidMount() {
    this.setState({ searchAttrList: searchAttr })
  }
  fetchChild = e => {
    const {
      fetchAdditionalField,
      session: {
        user: { _id }
      }
    } = this.props
    const { searchAttrList } = this.state
    const itmId = e.target.innerHTML

    if (itmId !== "Additional Fields") {
      const { children } = searchAttrList.find(itm => itm.text === itmId)
      this.setState({ childAttrList: children })
    } else {
      fetchAdditionalField({ _action: "LISTADDITIONALFIELDS", _id })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchConf.addFieldList !== this.props.searchConf.addFieldList) {
      const { data } = this.props.searchConf.addFieldList
      this.setState({ childAttrList: data })
    }
  }
  initParamLayout = e => {
    const incoming = e.target.getAttribute("data-incoming")
    if (incoming === "list") {
      const param = e.target.getAttribute("data-searchObj")
      const format = e.target.getAttribute("data-format")
      // console.log(param)
      this.setState({
        attrType: { param, format, title: e.target.innerHTML },
        toggleAddBtn: format === "string" || format === "date" || format === "number" || format === "accesscontrol" ? true : false
      })
    } else if (incoming === "queList") {
      const { queryParam } = this.state
      const selQueIdx = parseInt(e.target.getAttribute("data-idx"))
      const { format, title, query } = queryParam[selQueIdx]
      // console.log({ param: field, format, title })
      if (format !== undefined) {
        this.setState({
          attrType: { param: query.field, format, title, query: { ...query, idx: selQueIdx } },
          toggleAddBtn: format === "string" || format === "date" || format === "number" || format === "accesscontrol" ? true : false
        })
      }
    }
  }
  attrGenerator = cmp => {
    const {
      session: {
        user: { _id }
      }
    } = this.props
    console.log(cmp)
    if (cmp.format === "string") {
      return <TextField conf={cmp} onInputChange={this.setVal} />
    } else if (cmp.format === "date") {
      return <DateField conf={cmp} onInputChange={this.setVal} />
    } else if (cmp.format === "number") {
      return <NumField conf={cmp} onInputChange={this.setVal} />
    } else if (cmp.format === "operand") {
      return <ComboField conf={cmp} onInputChange={this.setVal} />
    } else if (cmp.format === "boolean") {
      return <ComboField conf={cmp} onInputChange={this.setVal} />
    } else if (cmp.format === "classification") {
      return <ItemLising conf={{ itmParam: { _action: "LISTCLASSIFICATION", _id }, ...cmp }} selItem={this.getItmSel} />
    } else if (cmp.format === "location") {
      return <ItemLising conf={{ itmParam: { _action: "LISTLOCATION", _id }, ...cmp }} selItem={this.getItmSel} />
    } else if (cmp.format === "seclevel") {
      return <ComboField conf={{ itmParam: { _action: "GETSECLEVEL", _id }, ...cmp }} onInputChange={this.setVal} />
    } else if (cmp.format === "lookupset") {
      return <ComboField conf={{ itmParam: { _action: "getlookupitem", _id, fieldname: cmp.param }, ...cmp }} onInputChange={this.setVal} />
    } else if (cmp.format === "seccaveat") {
      return <ComboField conf={{ itmParam: { _action: "GETCAVEATS", _id }, ...cmp }} onInputChange={this.setVal} />
    } else if (cmp.format === "accesscontrol") {
      return (
        <>
          <ComboField conf={cmp} onInputChange={this.getAc} />
          <ItemLising conf={{ itmParam: { _action: "LISTLOCATION", _id }, ...cmp }} selItem={this.getAc} />
        </>
      )
    } else {
      console.log(cmp.format)
    }
  }
  setVal = queryConf => {
    const { format, query } = queryConf
    if (format === "string") {
      if (query.value1 !== "") {
        this.setState({ disableAdd: false, inputText: queryConf })
      }
    } else if (format === "date") {
      this.setState({ disableAdd: false, inputText: queryConf })
    } else if (format === "number") {
      this.setState({ disableAdd: false, inputText: queryConf })
    } else if (format === "operand") {
      this.queryBuilder(queryConf)
    } else if (format === "seclevel") {
      this.queryBuilder(queryConf)
    } else if (format === "lookupset") {
      this.queryBuilder(queryConf)
    } else if (format === "seccaveat") {
      this.queryBuilder(queryConf)
    } else if (format === "boolean") {
      this.queryBuilder(queryConf)
    }
  }
  queryBuilder = queParam => {
    const { queryParam } = this.state
    if (queParam.idx === undefined) {
      const newQuery =
        queryParam.length === 0
          ? update(queryParam, { $push: [queParam] })
          : update(queryParam, { $push: [{ format: "operand", query: { op: "AND" } }, queParam] })
      this.setState({ queryParam: newQuery, attrType: null, toggleAddBtn: false, disableAdd: true })
    } else {
      const updateQue = update(queryParam, { [queParam.idx]: { query: { $set: queParam.query } } })
      this.setState({ queryParam: updateQue, attrType: null, toggleAddBtn: false, disableAdd: true })
    }
  }
  getItmSel = queParam => {
    this.queryBuilder(queParam)
  }
  inputQuery = () => {
    const { inputText } = this.state
    this.queryBuilder(inputText)
  }
  removeQuery = e => {
    const { queryParam } = this.state
    const selQueIdx = parseInt(e.target.getAttribute("data-idx"))
    const opIdx = selQueIdx - 1
    if (selQueIdx !== 0) {
      const removeQue = update(queryParam, { $splice: [[opIdx, 2]] })
      this.setState({ queryParam: removeQue })
    } else {
      const removeQue = update(queryParam, { $splice: [[selQueIdx, 2]] })
      this.setState({ queryParam: removeQue })
    }
  }
  performSearch = () => {
    const {
      session: {
        user: { _id }
      },
      setSearchParam,
      setActivePage
    } = this.props
    const { queryParam } = this.state
    // console.log(queryParam)
    const label = queryParam.map(itm => itm.query).map(itm => itm.value1)
    const queryString = queryParam.map(itm => itm.query)
    setSearchParam({
      _action: "SEARCHRECORD",
      _id,
      searchOrder: 0,
      jsonQuery: encodeURIComponent(JSON.stringify(queryString))
    })
    setActivePage("record")

    //Breadcrumb
    this.props.setNewBread(false, {
      id: label,
      label: "Search Value: "+label,
      activePage: "record",
      isActive: true
    })

  }
  getAc = queParam => {
    const { inputText } = this.state
    // console.log(inputText)
    if (inputText === null || inputText.format !== "accesscontrol") {
      this.setState({
        inputText: { title: "Access Control", format: "accesscontrol", query: { op: "EQUALS", field: "&&Access Control", ...queParam } }
      })
    } else {
      // const { query } = inputText
      const combinedQuery = update(inputText, { query: { $merge: { ...queParam } } })
      this.setState({ inputText: combinedQuery })
      if (combinedQuery.query.value1 !== undefined && combinedQuery.query.value2 !== undefined) {
        this.setState({ disableAdd: false })
      }
      // { title, format, query: { op: "EQUALS", field: param, value1: val.value } }
    }

    // this.setState({ disableAdd: false, inputText: queryConf })
  }
  render() {
    const { searchAttrList, childAttrList, attrType, opVal, opList, queryParam, toggleAddBtn, disableAdd } = this.state

    const attrList = searchAttrList.map(({ text }, idx) => (
      <label key={idx} className='text-primary recListMenu' data-idx={idx} onClick={this.fetchChild}>
        {text}
      </label>
    ))
    const childList = childAttrList.map(({ text, _format, _searchCriteria }, idx) => (
      <label
        key={idx}
        className='text-primary recListMenu'
        data-format={_format}
        data-searchobj={_searchCriteria}
        data-incoming={"list"}
        onClick={this.initParamLayout}
      >
        {text}
      </label>
    ))
    // console.log(toggleAddBtn)
    const queList = queryParam.map((itm, idx) => (
      <div
        key={idx}
        className={`col-2 d-flex align-items-center p-2 bg-primary mr-2 ${itm.format === "operand" ? "justify-content-center" : ""}`}
        data-idx={idx}
        data-incoming={"queList"}
        onClick={this.initParamLayout}
      >
        <div className='text-light' data-idx={idx} data-incoming={"queList"}>
          {itm.format !== "accesscontrol"
            ? `${itm.title !== undefined ? itm.title : ""} ${itm.query.op} ${itm.query.value1 !== undefined ? itm.query.value1 : ""} ${
                itm.query.value2 !== undefined ? ` AND ${itm.query.value2}` : ""
              }`
            : itm.query.value1 + " HAS Access " + itm.query.value2}
          {/* {itm.title} {itm.query.op} {itm.query.value1} {itm.query.value2 !== undefined ? ` AND ${itm.query.value2}` : ""} */}
        </div>
        {itm.format !== "operand" ? <i className='fa fa-times ml-2 text-light' data-idx={idx} onClick={this.removeQuery} /> : ""}
      </div>
    ))
    return (
      <section className='forms'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>Advance Search</h1>
            </div>
          </header>
          <div className='card'>
            <div className='card-header d-flex align-items-center'>
              <h4>Query Builder</h4>
            </div>
            <div className='card-body'>
              <div className='form-horizontal'>
                <div className='form-group row'>
                  <label className='col-sm-2 form-control-label'>Search Parameter</label>
                  <div className='col-sm-10'>
                    <div className='row'> {queList}</div>
                  </div>
                </div>
                {queryParam.length !== 0 ? (
                  <>
                    <div className='line' />
                    <div className='form-group row'>
                      <div className='col-12 text-right'>
                        <button type='button' className='btn btn-primary' onClick={this.performSearch}>
                          Search
                        </button>
                      </div>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
                <div className='form-group row'>
                  <div className='col-sm-2 border-right'>{attrList}</div>
                  <div className='col-sm-2 border-rights'>{childList}</div>
                  <div className='col-sm-8'>
                    {toggleAddBtn ? (
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='form-group' />
                        <button className='btn btn-sm btn-primary' type='button' disabled={disableAdd} onClick={this.inputQuery}>
                          <i className='fa fa-plus' />
                        </button>
                      </div>
                    ) : (
                      ""
                    )}

                    {attrType !== null ? this.attrGenerator(attrType) : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
index.propTypes = {
  session: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  setSearchParam: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  fetchAdditionalField: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  session: state.session,
  searchConf: state.searchConf
})

export default connect(
  mapStateToProps,
  {
    setSearchParam,
    setActivePage,
    fetchAdditionalField,
    setNewBread
  }
)(index)
