import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { fetchClassList } from "../../../actions/backendAction"
import { setSearchParam } from "../../../actions/searchAction"
import { setActivePage } from "../../../actions/layoutInitAction"
import { setNewBread } from "../../../actions/breadcrumbAction"
import SearchCard from "../../layout/SearchCard"

export class index extends Component {
  constructor() {
    super()
    this.state = {
      classList: [],
      totalRec: 0,
      currentPage: 1
    }
  }
  componentDidMount() {
    const {
      session: {
        user: { _id }
      },
      fetchClassList,
      searchConf: { classList }
    } = this.props
    // if (classList.data === undefined) {
    fetchClassList({ _action: "LISTCLASSIFICATION", _id, start: 0 })
    // }
    // else {
    //   this.setState({ classList: classList.data, totalRec: classList.totalCount })
    // }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.searchConf.classList !== this.props.searchConf.classList) {
      const { data, totalCount } = this.props.searchConf.classList
      this.setState({ classList: data, totalRec: totalCount })
    }
  }
  enterClass = ({ searchId, title, isLeaf }) => {
    const {
      setSearchParam,
      setActivePage,
      session: {
        user: { _id }
      },
      fetchClassList
    } = this.props
    if (!isLeaf) {
      fetchClassList({ _action: "LISTCLASSIFICATION", _id, start: 0, uri: searchId, anode: "koko" })
    } else {
      setSearchParam({
        _action: "SEARCHRECORD",
        _id,
        searchOrder: 0,
        jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Classification", value1: title, value2: "" }]))
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
  }
  render() {
    const { classList, totalRec, currentPage } = this.state
    const rec = classList.map((itm, idx) => (
      <SearchCard
        key={idx}
        searchId={itm.uri}
        title={itm["Number"]}
        isLeaf={itm.leaf}
        // isSel={itm.isSel}
        getDetails={this.enterClass}
        // getDetails={this.getRectypeDetails}
        // icon_type={"search"}
        desc={itm["Title"]}
      />
    ))
    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>Search By Classification</h1>
            </div>
          </header>
          <div className='row d-flex'>{rec}</div>
        </div>
      </section>
    )
  }
}
index.propTypes = {
  layout: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  fetchClassList: PropTypes.func.isRequired,
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
  { fetchClassList, setSearchParam, setActivePage, setNewBread }
)(index)
