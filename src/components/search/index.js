import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { fetchSavedSearch } from "../../actions/backendAction"
import { setSearchParam } from "../../actions/searchAction"
import { setActivePage } from "../../actions/layoutInitAction"
import { setNewBread } from "../../actions/breadcrumbAction"
import SearchCard from "../layout/SearchCard"

export class index extends Component {
  constructor() {
    super()
    this.state = {
      savedSearchList: [],
      totalRec: 0,
      currentPage: 1
    }
  }
  componentDidMount() {
    const {
      session: {
        user: { _id }
      },
      fetchSavedSearch,
      searchConf: { savedSearchList }
    } = this.props
    if (savedSearchList.data === undefined) {
      fetchSavedSearch({ _action: "LISTSAVEDSEARCHES", _id, start: 0 })
    } else {
      this.setState({ savedSearchList: savedSearchList.data, totalRec: savedSearchList.totalCount })
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchConf.savedSearchList !== this.props.searchConf.savedSearchList) {
      const { data, totalCount } = this.props.searchConf.savedSearchList
      this.setState({ savedSearchList: data, totalRec: totalCount })
    }
  }
  initSearch = ({ searchId, title }) => {
    const {
      setSearchParam,
      setActivePage,
      session: {
        user: { _id }
      }
    } = this.props

    setSearchParam({
      _action: "OPENSAVEDSEARCH",
      _id,
      rsUri: searchId,
      rsName: title,
      node: "root"
    })
    setActivePage("record")

     //Breadcrumb
     this.props.setNewBread(false, {
      id: searchId,
      label: title,
      activePage: "record",
      isActive: true
    })
  }
  render() {
    const { savedSearchList, totalRec, currentPage } = this.state
    const rec = savedSearchList.map((itm, idx) => (
      <SearchCard
        key={idx}
        searchId={itm.uri}
        title={itm.name}
        // isSel={itm.isSel}
        getDetails={this.initSearch}
        // getDetails={this.getRectypeDetails}
        // icon_type={"search"}
        desc={itm.description}
      />
    ))
    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>Search</h1>
            </div>
          </header>

          <div className='row d-flex'> {rec}</div>
          {/* <div className='card-columns'>{rec}</div> */}
        </div>
      </section>
    )
  }
}
index.propTypes = {
  layout: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  fetchSavedSearch: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  searchConf: state.searchConf
})

export default connect(
  mapStateToProps,
  { fetchSavedSearch, setSearchParam, setActivePage,setNewBread }
)(index)
