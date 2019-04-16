import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import update from "immutability-helper"
import Pagination from "rc-pagination/lib"
import localeInfo from "rc-pagination/lib/locale/en_US"

import { recFetch, recDelete, recDetails, recAcc } from "../../actions/backendAction"
import { toggleSearchWorkflow } from "../../actions/workflowAction"
import { setActivePage } from "../../actions/layoutInitAction"
import ThumbCard from "../layout/ThumbCard"
import SingleFab from "../fab/SingleFab"
import CreateWorkflow from "../workflow/CreateWorkflow"
 

export class index extends Component {
  constructor() {
    super()
    this.state = {
      recList: [],
      totalRec: 0,
      currentPage: 1,
      showFabSingle: false,
      showFabMulti: true,
      isMultiSel: false,
      isSelAll: false,
      selRec: null,   
      recDet: null,
    }
  }
  componentDidMount() {
    const {
      recFetch,
      searchConf: { searchParam }
    } = this.props
    recFetch(searchParam, { start: 0 })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.record.recList !== this.props.record.recList) {
      const { data, totalCount } = this.props.record.recList
      const rec = data.map(itm => ({ ...itm, isSel: false }))
      this.setState({ recList: rec, totalRec: totalCount })
    } else if (prevProps.searchConf.searchParam !== this.props.searchConf.searchParam) {
      const {
        searchConf: { searchParam },
        recFetch
      } = this.props
      recFetch(searchParam, { start: 0 })
      this.setState({ currentPage: 1 })
    }
  }
  nextPage = e => {
    const {
      searchConf: { searchParam },
      recFetch
    } = this.props
    recFetch(searchParam, { start: (e - 1) * 20 })
    this.setState({ currentPage: e })
  }
  markOnSel = recId => {
    const { recList, isMultiSel } = this.state
    const {
      // record: { isMultiSel }
      // fabToggle
    } = this.props
    const selRecIdx = recList.findIndex(rec => rec.uri === recId),
      deSelRecIdx = recList.findIndex(rec => rec.isSel === true),
      { isSel: selRecIsSel, ...recConf } = recList.find(rec => rec.uri === recId)
    const newSelRec = selRecIsSel
      ? update(recList, { [selRecIdx]: { isSel: { $set: false } } })
      : isMultiSel
      ? update(recList, { [selRecIdx]: { isSel: { $set: true } } })
      : deSelRecIdx === -1
      ? update(recList, { [selRecIdx]: { isSel: { $set: true } } })
      : update(recList, {
          [selRecIdx]: { isSel: { $set: true } },
          [deSelRecIdx]: { isSel: { $set: false } }
        })
    this.setState({ recList: newSelRec, selRec: recConf, showFabSingle: selRecIsSel ? false : true })
    // if (!isMultiSel) {
    //   if (deSelRecIdx === selRecIdx) {
    //     // this.props.setSelRec(null)
    //     fabToggle(true)
    //   } else {
    //     fabToggle(false)
    //   }
    // }
  }
  recAction = actionName => {
    const {
      session: {
        user: { _id }
      },
      recDelete,
      recDetails,
      setActivePage,
      recAcc,
      toggleSearchWorkflow
    } = this.props
    const { selRec } = this.state     
    console.log(selRec)
     
    switch (actionName) {
      case "delete":
        //confirmation box
        recDelete({ _action: "DELETERECORD", _id, _recordUri: selRec.uri })
        break
      case "finalize":
        recDelete({ _action: "FINALIZERECORD", _id, _recordUri: selRec.uri, removeOldRevs: true })
        break
      case "download":
        recDelete({ _action: "DOWNLOAD", _id, _recordUri: selRec.uri, _recordNo: selRec["Record Number"] })
        break
      case "initWorkflow":
        // recWorkflow({ _action: "INITIATEWF", _recordUri: selRec.uri, _recordNo: selRec["Record Number"], createWf: true })
        toggleSearchWorkflow(true)
        break
      case "details":
        recDetails({ _action: "VIEWPROPERTIES", _id, _recordUri: selRec.uri })          //<<<<<< NEW
        recAcc({ _action: "getAC", _recordUri: selRec.uri, _id })      
        setActivePage("recEdit")
        break
      default:
      // recDetails({ _action: "GENFORM", _id, _recType: selRec.uri })
      console.log("generate form")
      console.log(recDelete)
        
    }
    // console.log(selRec)
    console.log(actionName)
  }
  render() {
    const { recList, totalRec, currentPage, showFabSingle, selRec } = this.state    
    // console.log(selRec.uri) 
    const rec = recList.map((itm, idx) => (
      <ThumbCard
        key={idx}
        recId={itm.uri}
        recType={itm["Record Type"]}
        title={itm.Title}
        isSel={itm.isSel}
        recProps={itm._property}
        isContainer={itm._property.hascontained} //hascontained
        isChild={itm._property.hascontainer} //hascontainer
        getDetails={this.markOnSel}
        record_type_icon={itm.iconCls}
        date_created={itm["Date Created"]}
      />
    ))
    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>Records</h1>
            </div>
          </header>
          <div className='row d-flex'>{rec}</div>
          {showFabSingle ? <SingleFab recConf={selRec} editRec={this.recAction} /> : ""}

          {totalRec > 20 ? (
            <div className='d-flex justify-content-end mt-1 mb-1'>
              <Pagination locale={localeInfo} onChange={this.nextPage} current={currentPage} pageSize={20} total={totalRec} />
            </div>
          ) : (
            ""
          )}
        </div>   
        <CreateWorkflow conf={selRec} />     
      </section>
    )
  }
}
index.propTypes = {
  layout: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  recFetch: PropTypes.func.isRequired,
  recDelete: PropTypes.func.isRequired,
  recDetails: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  recAcc: PropTypes.func.isRequired,  
  toggleSearchWorkflow: PropTypes.func.isRequired,     
}
const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  record: state.rec,
  searchConf: state.searchConf,
})

export default connect(
  mapStateToProps,
  { recFetch, recDelete, recDetails, setActivePage, recAcc, toggleSearchWorkflow }
)(index)
