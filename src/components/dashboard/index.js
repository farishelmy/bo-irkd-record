import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// import AnalyticComps from "../dashboard/AnalyticComps";


export class index extends Component {
  render() {
    return (
      <section>
        <div className='container-fluid'>
          <header>
            <div className='d-flex align-items-center justify-content-between'>
              <h1 className='h3 display'>Dashboard</h1>
            </div>
          </header>

          {/* <AnalyticComps ref={el => (this.componentRef = el)} /> */}
          
        </div>
      </section>
    )
  }
}
index.propTypes = {
  // layout: PropTypes.object.isRequired,
  // session: PropTypes.object.isRequired,
  // searchConf: PropTypes.object.isRequired,
  // fetchSavedSearch: PropTypes.func.isRequired
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps)(index)
