import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import update from "immutability-helper"
import Pagination from "rc-pagination/lib"
import localeInfo from "rc-pagination/lib/locale/en_US"

import { fetchObjList } from "../../../actions/backendAction"
import { setSearchParam } from "../../../actions/searchAction"

import ItmCard from "../../dynComp/ItmCard"
export class ItemLising extends Component {
  constructor() {
    super()
    this.state = {
      itmList: [],
      totalRec: 0,
      currentPage: 1,
      nav: [{ title: "Root", uri: "root" }]
    }
  }
  dataBinder() {
    const {
      conf: { itmParam },
      setSearchParam
    } = this.props
    setSearchParam(itmParam)
  }
  componentDidMount() {
    this.dataBinder()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.conf.format !== this.props.conf.format) {
      this.dataBinder()
      this.setState({ currentPage: 1 })
    } else if (prevProps.searchConf.searchParam !== this.props.searchConf.searchParam) {
      const {
        fetchObjList,
        searchConf: { searchParam }
      } = this.props
      fetchObjList(searchParam, { start: 0 })
    } else if (prevProps.searchConf.objList !== this.props.searchConf.objList) {
      const { data, totalCount } = this.props.searchConf.objList
      this.setState({ itmList: data, totalRec: totalCount })
      // console.log(data)
    }
  }
  backToParent = e => {
    const {
      conf: { itmParam },
      setSearchParam
    } = this.props

    const { nav } = this.state
    const uri = e.target.getAttribute("data-uri")
    // console.log(uri)
    if (uri === "root") {
      setSearchParam(itmParam)
    } else {
      setSearchParam({ ...itmParam, uri, anode: "irekod" })
    }
    const newNav = nav.slice(0, nav.length - 1)
    this.setState({ nav: newNav })
  }

  iterateItem = conf => {
    const {
      conf: { itmParam, incoming },
      setSearchParam
    } = this.props
    const { nav } = this.state
    if (!conf.leaf) {
      setSearchParam({ ...itmParam, uri: conf.uri, anode: "irekod" })
      const newNav = update(nav, {
        $push: [
          {
            title: conf.title,
            uri: conf.uri
          }
        ]
      })
      this.setState({ nav: newNav, currentPage: 1 })
    } else {
      if (incoming !== undefined) {
        console.log(conf.iconCls)
        setSearchParam({ ...itmParam, uri: conf.uri, anode: "irekod" })
        const newNav = update(nav, {
          $push: [
            {
              title: conf.title,
              uri: conf.uri
            }
          ]
        })
        this.setState({ nav: newNav, currentPage: 1 })
      }
    }
  }

  generateQuery = itm => {
    const {
      conf: { param, title, format, query, incoming },
      selItem
    } = this.props
    // const searchParam = {
    //   title,
    //   format,
    //   query: { op: "EQUALS", field: `${param}`, value1: itm }
    // }
    if (incoming === undefined) {
      const searchParam = format !== "accesscontrol" ? { title, format, query: { op: "EQUALS", field: `${param}`, value1: itm } } : { value1: itm }
      selItem(query !== undefined ? { ...searchParam, idx: query.idx } : searchParam)
    } else {
      selItem(itm)
    }
  }
  nextPage = e => {
    const {
      searchConf: { searchParam },
      fetchObjList
      // recFetch
    } = this.props
    fetchObjList(searchParam, { start: (e - 1) * 20 })
    this.setState({ currentPage: e })
  }
  render() {
    const { itmList, totalRec, nav, currentPage } = this.state
    const {
      conf: { format, incoming }
    } = this.props
    const rec = itmList.map((itm, idx) => {
      if (format === "classification") {
        const title = `${itm["Record Number"]} ${itm["Title"]}`
        return (
          <ItmCard
            key={idx}
            conf={{ ...itm, incoming }}
            title={title}
            getChild={this.iterateItem}
            getDetails={this.generateQuery}
            value={itm["Record Number"]}
          />
        )
      } else if (format === "location" || format === "accesscontrol") {
        const title = itm["Name"]
        return <ItmCard key={idx} conf={itm} title={title} getChild={this.iterateItem} getDetails={this.generateQuery} value={itm["Name"]} />
      }
    })
    // console.log(nav)
    return (
      <>
        {nav[nav.length - 1].uri !== "root" ? (
          // nav.length !== 0
          <div className='d-flex justify-content-between recListMenu' data-uri={nav[nav.length - 2].uri} onClick={this.backToParent}>
            <div className='left-col d-flex align-items-center' data-uri={nav[nav.length - 2].uri}>
              <div className='icon mr-2' data-uri={nav[nav.length - 2].uri}>
                <i className='fa fa-angle-left' data-uri={nav[nav.length - 2].uri} />
                {/* <img src={require(`../../../img/search.svg`)} className='listIcn' alt='...' /> */}
              </div>
              <p className='title text-primary mb-0' data-uri={nav[nav.length - 2].uri}>
                {nav[nav.length - 1].title}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {rec}
        {totalRec > 20 ? (
          <div className='d-flex justify-content-end p-2'>
            <Pagination className='mb-0' locale={localeInfo} onChange={this.nextPage} current={currentPage} pageSize={20} total={totalRec} />
          </div>
        ) : (
          ""
        )}
      </>
    )
  }
}

ItemLising.propTypes = {
  session: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  conf: PropTypes.object.isRequired,
  fetchObjList: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  session: state.session,
  searchConf: state.searchConf
})

export default connect(
  mapStateToProps,
  { fetchObjList, setSearchParam }
)(ItemLising)
