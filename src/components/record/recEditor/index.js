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
      sectionTab: []
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.record.recConf !== this.props.record.recConf) {
      const {
        recProps: { formTitle },
        cmp
      } = this.props.record.recConf
      const sectionTab = cmp.map((itm, idx) => ({ ...itm, active: idx !== 0 ? false : true }))
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
  render() {
    const { formTitle, sectionTab } = this.state
    // const { record: { recConf : { recProps } } } = this.props
    const [activeTabConf] = sectionTab.filter(itm => itm.active === true)
    const secTab = sectionTab.map((itm, idx) => <EditorHeader key={idx} secId={idx} active={itm.active} title={itm.name} />)
    const activeTab = <TabEditor conf={activeTabConf} sendFormVal={this.submitForm} />

    return (
      <section className='statistics'>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>New {formTitle} </h1>
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
  recSave: PropTypes.func.isRequired
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
