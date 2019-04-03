import React, { Component } from 'react'


import PropTypes from 'prop-types'
import { connect } from 'react-redux'

 

 



class ListModalAssignee extends Component {

    constructor() {
        super()
        this.state = {  
            locList:[],        
        }

    }     

    componentWillMount(){
        const {locType}=this.props.location   
        this.setState({
            locList:locType
        })
    }
       

     

  render() {
      const { locList } = this.state
      console.log(locList)
      
      
    return (
        <section>

            {locList.map(item=>

                <div key={item.uri} className='left-col d-flex align-items-center'>
                    <div className='icon mr-2'>
                        {/* <i className='fa fa-angle-left'/>    */}
                        {item.typeName}            
                    </div>
                    <p className='title text-primary mb-0'>
                        {item.name}
                    </p>
                </div>

            )}
        </section>
    )
  }
}

ListModalAssignee.propTypes={
    session: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,    
   
    
 
     
  }
const mapStateToProps = state => ({
    layout:state.layout,   
    workflow:state.workflow,
    session:state.session,
    location:state.location,
     
})

export default connect(mapStateToProps,{
   
   

})(ListModalAssignee)