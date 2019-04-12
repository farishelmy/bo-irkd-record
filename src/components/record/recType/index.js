import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { setActivePage } from "../../../actions/layoutInitAction"
import { recTypeFetch, recDetails, recAcc } from "../../../actions/backendAction"
import ThumbCard from "../../layout/ThumbCard"
import { setNewBread } from '../../../actions/breadcrumbAction' 

export class index extends Component {
  constructor() {
    super()
    this.state = {
      recTypeList: [],
      titlePage: ""
    }
  }
  componentDidMount() {
    const {
      recTypeFetch,
      session: {
        user: { _id }
      },
      record: { recTypeList },
      layout: { activePage }
    } = this.props
    if (recTypeList.data === undefined) {
      recTypeFetch(
        {
          _action: "LISTRECTYPES",
          _id
        },
        "createRec"
      )
    } else {
      this.setState({ recTypeList: recTypeList.data })
    }
    this.setState({ titlePage: activePage === "formSearch" ? "Record Types" : "Create New Record" })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.record.recTypeList !== this.props.record.recTypeList) {
      const { data } = this.props.record.recTypeList
      this.setState({ recTypeList: data })
    }
  }
  markOnSel = (rtId, title) => {
    // console.log(rtId)
    const {
      session: {
        user: { _id }
      },
      recDetails,
      recAcc,
      setActivePage
    } = this.props
    recDetails({ _action: "VIEWPROPERTIES", _id, _recordTypeUri: rtId, _recordUri: "", _containerRecordNum: "", _isSearchForm: "" })
    recAcc({ _action: "getAC", _recordUri: rtId, _id })      
    setActivePage("recEdit")

     //Breadcrumb
     this.props.setNewBread(false, {
      id: rtId,
      label: title,
      activePage: "recEdit",
      isActive: true
    })

  }
  render() {
    const { recTypeList, titlePage } = this.state
    const rec = recTypeList.map((itm, idx) => (
      <ThumbCard
        key={idx}
        recId={itm.rturi}
        // recType={itm["Record Type"]}
        title={itm.rtname}
        // isSel={itm.isSel}
        getDetails={this.markOnSel}
        isContainer={false} //hascontained
        isChild={false} //hascontainer
        // getDetails={this.getRectypeDetails}
        // record_type_icon={"doc"}
        // date_created={itm["Date Created"]}
      />
    ))
    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>{titlePage}</h1>
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
  record: PropTypes.object.isRequired,
  recTypeFetch: PropTypes.func.isRequired,
  recDetails: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  recAcc: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  record: state.rec
})

export default connect(
  mapStateToProps,
  { recTypeFetch, recDetails, setActivePage, setNewBread, recAcc }
)(index)
