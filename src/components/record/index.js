import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import update from "immutability-helper"
import Pagination from "rc-pagination/lib"
import localeInfo from "rc-pagination/lib/locale/en_US"

import { recFetch, recDelete, recDetails, recAcc, recDownload } from "../../actions/backendAction"
import { setSearchParam } from "../../actions/searchAction"
import { populateWorkflow, setShowFab } from "../../actions/workflowAction"
import { setActivePage } from "../../actions/layoutInitAction"
import { setNewBread } from "../../actions/breadcrumbAction"
import ThumbCard from "../layout/ThumbCard"
import SingleFab from "../fab/SingleFab"
import CreateWorkflow from "../workflow/CreateWorkflow"
import EmailForm from "../record/EmailForm"
import CheckInForm from "../record/CheckInForm"
import CheckOutForm from "../record/CheckOutForm"


 

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
      createWF: false,
      checkOut: false,
      checkIn: false,
      email: false,
      wizardRec:false, 
    }
  }
  componentDidMount() {
    const {
      active,
      recFetch,
      searchConf: { searchParam },
      layout:{ showFab }
    } = this.props
    recFetch(searchParam, { start: 0 })
    this.setState({showFabSingle:showFab})
  
    if(active!==undefined){
      if(active==="record"){
        this.setState({
          wizardRec:true
        })
      }
    }
  }
  componentDidUpdate(prevProps,prevState) {
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

  //Selection
  markOnSel = (recId,title) => {
    const { recList, isMultiSel } = this.state
    // console.log(recList)
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

  //if Revision
  selected = (recId,title) => {
    const { recList, isMultiSel, revision } = this.state
    // console.log(recList)
    const {
      // record: { isMultiSel }
      // fabToggle
    } = this.props    

    const selRecIdx = recList.findIndex(rec => rec.revuri === recId),
    deSelRecIdx = recList.findIndex(rec => rec.isSel === true),
    { isSel: selRecIsSel, ...recConf } = recList.find(rec => rec.revuri === recId)    
    
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
    this.setState({ recList: newSelRec, selRec: recConf, showFabSingle: selRecIsSel ? false : true,})
    
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
        user: { _id, sortname }
      },
      recDelete,
      recDetails,
      setActivePage,
      recAcc,
      recDownload,
      populateWorkflow,
      setNewBread,
      setSearchParam,   
    } = this.props
    const { selRec, recList } = this.state   
    // console.log(selRec.revisionnumber)
     
    switch (actionName) {
      case "delete":
        //confirmation box
        recDelete({ _action: "DELETERECORD", _id, _recordUri: selRec.uri })
        const delItem = recList.filter(itm => itm.uri !== selRec.uri)
        this.setState({recList:delItem})
        alert("Successful Deleted")
        break
      case "finalize":
        recDelete({ _action: "FINALIZERECORD", _id, _recordUri: selRec.uri, removeOldRevs: true })
        break
      case "download":
        if(selRec.revisionnumber!==undefined){
          recDownload({ _action: "DOWNLOADREVISION", _id, revuri: selRec.revuri, _recordUri: selRec.uri, _recordNo: selRec["Record Number"] })
        }
        else{
          recDownload({ _action: "DOWNLOAD", _id, _recordUri: selRec.uri, _recordNo: selRec["Record Number"] })
        }
        break
      case "checkin":
        this.setState({checkIn:true})
        break
      case "checkout":
        this.setState({checkOut:true})
        break
      case "revision":
        setSearchParam({_action:"LISTREVISION", _recordUri: selRec.uri, _recordNo:selRec["Record Number"], _id})
        this.setState({showFabSingle:false})
        break
      case "parent":
        setSearchParam({ 
          _action: "SEARCHRECORD",
          _id,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Container Of", value1: selRec["Record Number"] }]))
        })
        this.setState({showFabSingle:false})
        break
      case "child":
        setSearchParam({ 
          _action: "SEARCHRECORD",
          _id,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Contained Within", value1: selRec["Record Number"] }]))
        })
        this.setState({showFabSingle:false})
        break
      case "part":
        setSearchParam({ 
          _action: "SEARCHRECORD",
          _id,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&All Parts", value1: selRec["Record Number"] }]))
        })
        this.setState({showFabSingle:false})
        break
      case "initWorkflow":
        this.setState({createWF:true})
        break
      case "workflow":
        populateWorkflow({_action: "SEARCHWORKFLOW", _recordNo: selRec["Record Number"], _id})
        setActivePage("listAllWorkflow")
        setNewBread(false, { id: "Record", label: selRec["Record Number"], activePage: "listAllWorkflow", isActive: true })
        break
      case "email":
        this.setState({email:true})
        break
      case "details":
        recDetails({ _action: "VIEWPROPERTIES", _id, _recordUri: selRec.uri })       
        recAcc({ _action: "getAC", _recordUri: selRec.uri, _id })      
        setNewBread(false, { id: "Record", label: selRec["Record Number"], activePage: "recEdit", isActive: true })
        setActivePage("recEdit")
        break
      default:
      // recDetails({ _action: "GENFORM", _id, _recType: selRec.uri })
      console.log("generate form")
      // console.log(recDelete)
        
    }
    // console.log(selRec)
    console.log(actionName)
  }

  closedModal=(val)=>{
    // console.log(val)
    this.setState({
      email:val,
      checkIn:val,
      checkOut: val,
      createWF: val
    })
  }

  render() {
    const { recList, totalRec, currentPage, showFabSingle, selRec, checkIn, email, createWF, checkOut, wizardRec } = this.state   
    // console.log(showFabSingle)
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
        getSelected={this.selected}
        revisionnumber={itm.revisionnumber}
        datemodified={itm.datemodified}
        revuri={itm.revuri}
        preserve={itm.preserve}
      />
    ))
    
    const noData =  
    <div className='d-flex align-items-center justify-content-center'>
      <h1 className='h3 display'>There is no records.</h1>
    </div>

    return (
      <section className='statistics'>
        <div className={wizardRec?'container-fluid bg-light':'container-fluid'}>
          <header>
            <div className={wizardRec?'d-flex align-items-center justify-content-center':'d-flex align-items-center justify-content-between'}>
              <h1 className={wizardRec?'h3 display text-primary text-center':'h3 display'}>Records</h1>
            </div>
          </header>
          <div className='row d-flex'>{rec.length!==0?rec:noData}</div>
          {showFabSingle ? <SingleFab recConf={selRec} editRec={this.recAction} /> : ""}

          {totalRec > 20 ? (
            <div className='d-flex justify-content-end mt-1 mb-1'>
              <Pagination locale={localeInfo} onChange={this.nextPage} current={currentPage} pageSize={20} total={totalRec} />
            </div>
          ) : (
            ""
          )}
        </div>   

          {createWF!==false?<CreateWorkflow conf={selRec} createWF={createWF} closedModal={this.closedModal} />:""} 
          {email!==false?<EmailForm conf={selRec} email={email} closedModal={this.closedModal} />:""}  
          {checkIn!==false?<CheckInForm conf={selRec} checkIn={checkIn} closedModal={this.closedModal} />:""}
          {checkOut!==false?<CheckOutForm conf={selRec} checkOut={checkOut} closedModal={this.closedModal} />:""}

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
  populateWorkflow: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired,
  recDownload: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  record: state.rec,
  searchConf: state.searchConf,
})

export default connect(
  mapStateToProps,
  { 
    recFetch, 
    recDelete, 
    recDetails, 
    setActivePage, 
    recAcc, 
    populateWorkflow, 
    setNewBread, 
    setSearchParam,
    recDownload
  }
)(index)
