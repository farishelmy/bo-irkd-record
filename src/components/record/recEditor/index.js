import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import EditorHeader from "./EditorHeader"
import TabEditor from "./TabEditor"
import { recSave } from "../../../actions/backendAction"

export class index extends Component {
  constructor() {
    super()
    this.state = {
      formTitle: null,
      sectionTab: [],
      sectionAcc: []
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.record.recConf !== this.props.record.recConf) {
      const { 
        recConf: { 
          recProps: { formTitle }, 
          cmp
        },
        recAcc
      }= this.props.record
      const sectionTab = cmp.map((itm, idx) => ({ ...itm, active: idx !== 0 ? false : true }))
      const sectionAcc = [recAcc]
      this.setState({ formTitle, sectionTab, sectionAcc })
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
      session: {
        user: { _id }
      },
      record: {
        recConf: {
          recProps: { rtUri } ,
          cmp
        }
      }
    } = this.props
    
    if(val === 0){
      const sectionTab = cmp.map((itm, idx) => ({ ...itm, active: idx !== 0 ? false : true }))
      this.setState({ sectionTab })
    }
    if(val === 1 ){
      const sectionTab = cmp.map((itm, idx) => ({ ...itm, active: idx !== 1 ? false : true }))
      this.setState({ sectionTab })
    }
    if(val === 2 ){
      const sectionTab = cmp.map((itm, idx) => ({ ...itm, active: idx !== 2 ? false : true }))
      this.setState({ sectionTab })
    }
  }

  render() {
    const { formTitle, sectionTab, sectionAcc } = this.state
    // const { record: { recConf : { recProps } } } = this.props
    const [activeTabConf] = sectionTab.filter(itm => itm.active === true)
    const secTab = sectionTab.map((itm, idx) => <EditorHeader key={idx} var={{ secId:idx, active:itm.active, title:itm.name }} value={this.setChangeVal} />)
    const activeTab = <TabEditor conf={activeTabConf} sendFormVal={this.submitForm} accConf={sectionAcc} />

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
            <div className='card-body'>{activeTab}</div>
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
