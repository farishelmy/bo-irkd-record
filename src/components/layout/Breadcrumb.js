import React, { Component } from "react"
// import PropTypes from 'prop-types'
import { connect } from "react-redux"

export class Breadcrumb extends Component {
  render() {
    return (
      <div className='breadcrumb-holder'>
        <div className='container-fluid'>
          <ul className='breadcrumb'>
            <li className='breadcrumb-item' to='/'>
              Home
            </li>
            <li className='breadcrumb-item active'>Upload</li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Breadcrumb)
