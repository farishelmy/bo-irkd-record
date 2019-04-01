import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'



class RecordWizard extends Component {

  constructor(){
    super()
    this.state={
          
    }        
  }  

 

  
  render() {
    const {recordStore}  = this.props.activity
    // console.log(recordStore)
   

    return (
      <Fragment>
      <h1 className="h3 display text-primary text-center">Record</h1>
       
      </Fragment>
    )
  }
}

RecordWizard.propTypes={
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,   
  activity:PropTypes.object.isRequired, 
   
}

const mapStateToProps= state =>({
      session:state.session,
      layout:state.layout,       
      activity:state.activity,
})
  
export default connect(mapStateToProps, {
  
})(RecordWizard)

