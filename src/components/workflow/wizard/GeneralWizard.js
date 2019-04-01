import React, { Component, Fragment } from 'react'
import Select from 'react-select'
import { Button } from 'reactstrap'
import Tooltip from 'rc-tooltip'

import 'rc-tooltip/assets/bootstrap.css'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class GeneralWizard extends Component {
    constructor() {
        super()
        this.state = {
            workflowName: null,
            workflowUri: null,
            supervisor: null,
            dateStart: null,
            dateDue: null,
            jobNo: null,
            priority: null,
            locList:[],
            priorityOption:[
                {value: "Very High" ,label: "Very High" },
                {value: "High" ,label: "High"},
                {value: "Medium" , label: "Medium"},
                {value:  "Low" ,label: "Low"},  
                {value: "Very Low" ,label: "Very Low"}                
            ],  


        }
    }

    componentWillMount() {
        const { workflowName, workflowUri, supervisor, icon, dateStart, dateDue, jobNo, priority } = this.props.item
        const { locType }=this.props.location   
        const locOptions = locType.map(itm=>({ value: itm.uri, label:itm.Name}))
        const priorityVal = ({value: priority, label: priority})
        this.setState({
            workflowName: workflowName,
            workflowUri: workflowUri,
            supervisor: supervisor,
            dateStart: dateStart,
            dateDue: dateDue,
            jobNo: jobNo,
            priority:priorityVal,
            locList: locOptions,
        })
    }

    handleChange = (e) => {
        const inputName = e.target.getAttribute('name')
        const inputVal = e.target.value
        // ===""?e.target.value=null:e.target.value  
        // console.log(e.target.value)    

        this.setState({
            [inputName]: inputVal
        })
        // console.log(inputName)   
        //  console.log(inputVal)
    }

    handleSupervisor=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({supervisor:param})
        // console.log(param)
    }

    handlePriority=(param)=>{
        // const inputName = e.target.getAttribute('name')
        this.setState({priority:param})
        // console.log(param)
    }




    render() {

        const { workflowName, workflowUri, supervisor, icon, dateStart, dateDue, jobNo, priority, locList, priorityOption } = this.state




        return (
            <Fragment>
                <h1 className="h3 display text-primary text-center">General</h1>
                <form className="mt-3 mr-3 ml-3" onSubmit={this.formSubmit}>
                    <div className="row justify-content-center mb-5">
                        <div className="col-xl-3 col-lg-4 col-md-4">
                            <div className="text-center mt-5">
                                <img src={require('../../../img/management.svg')} alt="management" className=" img-dash" />
                            </div>
                        </div>

                        <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                            <div className="row">
                                <div className="col-sm-6 form-group">
                                    <label>Title</label>
                                    <input name="workflowName" type="text" placeholder="Mr / Mrs" className="form-control" onChange={this.handleChange} value={workflowName} />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label>Job Number</label>
                                    <input name="jobNo" type="text" className="form-control" placeholder="Smith" onChange={this.handleChange} value={jobNo} />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label>Priority</label>
                                    <Select 
                                        name="priority"
                                        options={priorityOption}
                                        onChange={this.handlePriority}
                                        value={priority===""?null:priority} 
                                        placeholder="Name"
                                        isClearable
                                    /> 
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label>Supervisor</label>
                                    <Select
                                        name="supervisor"
                                        options={locList}
                                        onChange={this.handleSupervisor}
                                        value={supervisor === "" ? null : supervisor}
                                        placeholder="Name"
                                        isClearable
                                    />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label>Date Due</label>
                                    <input name="dateDue" type="text" className="form-control" placeholder="Smith@htech.com..." onChange={this.handleChange} value={dateDue} />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label>Date Start</label>
                                    <input name="dateStart" type="text" className="form-control" placeholder="Smith@htech.com..." onChange={this.handleChange} value={dateStart} />
                                </div>
                                {/* <div className={pageTitle!=="User"?"col-sm-6 form-group":"col-sm-4 form-group"}>
                                <label>Date of Birth</label>
                                <DatePicker
                                    name="date_of_birth" 
                                    placeholderText="Date of Birth"
                                    className="form-control" 
                                    dateFormat="DD/MM/YYYY" 
                                    selected={date_of_birth!==null?moment(date_of_birth, "DD/MM/YYYY"):date_of_birth}  
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onChange={this.handleDateChange}/>                               
                            </div>                 */}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary">Close</button>
                    </div>
                </form>

            </Fragment>
        )
    }
}
GeneralWizard.propTypes = {
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    workflow: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    session: state.session,
    layout: state.layout,
    location: state.location,
    workflow: state.workflow,

})

export default connect(mapStateToProps,
    {


    })(GeneralWizard)