import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import EditorHeader from "./EditorHeader"
import TabEditor from "./TabEditor"
import TabAccess from "./TabAccess"
import TabNotes from "./TabNotes"

import { recSave } from "../../../actions/backendAction"

export class index extends Component {
  constructor() {
    super()
    this.state = {
      formTitle: null,
      sectionTab: [],
      sectionAcc:[],
      tab:0,
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.record.recConf !== this.props.record.recConf) {
      const { 
        recConf: { 
          recProps: { formTitle }, 
          cmp
        },
      }= this.props.record
      const tabFilter = cmp.map((itm, idx) => ({ ...itm, active: idx !== 0 ? false : true , hide: idx <= 2 ? false : true }))
      const sectionTab = tabFilter.filter(itm => itm.hide === false )
      this.setState({ formTitle, sectionTab })
    }   
    // if (prevState.sectionTab !== this.state.sectionTab) {
    //   const { sectionTab } = this.state
    //   const [activeTab] = sectionTab.filter(itm => itm.active === true)
    //   console.log(activeTab)
    // }
  }
  // initFormLayout = cmp => {
  //   console.log(cmp)
  // }
  submitForm = formVal => {
    const {
      session: {
        user: { _id }
      },
      record: {
        recConf: {
          recProps: { rtUri }
        }
      }
    } = this.props
    console.log(formVal)
    this.props.recSave({ _action: "SAVEFORM", _id, ...formVal, recordTypeUri: rtUri })
  }

  setChangeVal=(val)=>{
    // console.log(val)
    const {
      record: {
        recConf: {
          cmp
        },
        recAcc
      }
    } = this.props
    
    if(val === 0){
      const tabFilter = cmp.map((itm, idx) => ({ ...itm, active: idx !== 0 ? false : true, hide: idx <= 2 ? false : true }))
      const sectionTab = tabFilter.filter(itm => itm.hide === false)
      this.setState({ sectionTab, tab: val })
    }
    if(val === 1 ){
      const tabFilter = cmp.map((itm, idx) => ({ ...itm, active: idx !== 1 ? false : true, hide: idx <= 2 ? false : true }))
      const sectionTab = tabFilter.filter(itm => itm.hide === false)
      this.setState({ sectionTab,  tab: val, sectionAcc: recAcc  })
    }
    if(val === 2 ){
      const tabFilter = cmp.map((itm, idx) => ({ ...itm, active: idx !== 2 ? false : true, hide: idx <= 2 ? false : true }))
      const sectionTab = tabFilter.filter(itm => itm.hide === false)
      this.setState({ sectionTab,  tab: val })
    }
  }

  render() {
    const { formTitle, sectionTab, tab, sectionAcc } = this.state  
    const [activeTabConf] = sectionTab.filter(itm => itm.fieldType === "fTab" && itm.active === true )
    const secTab = sectionTab.map((itm, idx) => <EditorHeader key={idx} var={{ secId:idx, active:itm.active, title:itm.name }} value={this.setChangeVal} />)
    const genTab = <TabEditor conf={activeTabConf} sendFormVal={this.submitForm} />
    const accTab = <TabAccess conf={sectionAcc}/>
    const notesTab = <TabNotes conf={sectionAcc}/>


    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>{formTitle} </h1>
            </div>
          </header>
          <div className='card'>
            <div className='card-header '>
              <div className='row colWrap justify-content-center m-0'>{secTab}</div>
            </div>
            <div className='card-body'>
              {
                tab===0?genTab
                :tab===1?accTab
                :tab===2?notesTab
                :""
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

index.propTypes = {
  layout: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  recSave: PropTypes.func.isRequired,  
}
const mapStateToProps = state => ({
  layout: state.layout,
  session: state.session,
  record: state.rec
})

export default connect(
  mapStateToProps,
  { recSave }
)(index)
