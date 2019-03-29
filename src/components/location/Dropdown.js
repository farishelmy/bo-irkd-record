import React, { Component } from 'react'
import Select from 'react-select'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setStakehType,setStakehLabel,setStakehNumb} from '../../actions/location'
import {searchStatus} from '../../actions/location'

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: false,
            selectedLoc: [],
            optionLoc:[
                { value: "All", label:"All Locations"},
                { value: "organization", label:"Organization"},
                { value: "Position", label:"Position"},
                { value: "Person", label:"Person"},
                { value: "Unknown", label:"Unknown"},                 
            ],             
        }
    }      

    componentDidUpdate(prevProps){
        if(prevProps.location.locType !== this.props.location.locType){            
            const {locLabel} = this.props.location 
            const value = ({value:locLabel, label:locLabel})
            
            this.setState({
                selectedLoc: value
            })
        }         
    }

    componentWillMount(){
        const {locLabel} = this.props.location 
        const value = ({value:locLabel, label:locLabel})

        this.setState({        
            selectedLoc: value
        })   
    }

    handleChange = (value) => {
        // console.log(value.value)
        this.setState({ selectedLoc: value.value})

        const {user:{_id:bId}} = this.props.session

        const stakehObj={
            _action:'LISTLOCATION',
            _id:bId,                        
            filterType: value.value,
        }
        
        this.props.setStakehType(stakehObj) 
        this.props.setStakehNumb(value.value)
        this.props.setStakehLabel(value.label)
        this.props.searchStatus(false)


        if (value.value === "All"){
            const stakehList={
                _action: "LISTLOCATION",
                _id: bId       
            }
            this.props.setStakehType(stakehList)
        }


    }
    
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

  render() {   

    
    return (
 
        <Select
            className="basic-single"
            onChange={this.handleChange}
            options={this.state.optionLoc}
            placeholder="Type"
            value={this.state.selectedLoc}
        />

    )
  }
}

Dropdown.propTypes={
    session: PropTypes.object.isRequired, 
    location: PropTypes.object.isRequired, 
    // breadcrumb: PropTypes.object.isRequired, 
    setStakehType: PropTypes.func.isRequired,   
    setStakehLabel: PropTypes.func.isRequired,
    setStakehNumb: PropTypes.func.isRequired,    
    searchStatus:  PropTypes.func.isRequired, 
   
  }
  const mapStateToProps= state =>({
    session:state.session, 
    location:state.location,   
    // breadcrumb: state.breadcrumb 
    
  })
export default connect(mapStateToProps,{
    setStakehType,
    setStakehNumb,
    setStakehLabel,
    searchStatus

})(Dropdown)