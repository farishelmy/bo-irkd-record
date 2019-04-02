import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import moment from 'moment'

import { setActivePage } from "../../actions/layoutInitAction"
import { setSearchParam } from "../../actions/searchAction"
import { setStakehType, setStakehNumb, setShowFab, setStakehLabel, setStakehSel } from '../../actions/location'
import { populateWorkflow, toggleSearchWorkflow } from '../../actions/workflowAction'
import { setListActDue, toggleSearchActivity } from '../../actions/activityAction'
import { setNewBread, resetNav } from '../../actions/breadcrumbAction'

class SideNav extends React.Component {
  constructor() {
    super()
    this.state = {
      folderToggle: false,
      documentToggle: false,
      uploadToggle: false,
      locationToggle: false,
      workflowToggle: false,
      activityToggle: false,
    }
  }

  toggleClass = e => {
    e.preventDefault()
    const {
      setSearchParam,
      session: {
        user: { _id, sortname }
      }
    } = this.props
    switch (e.target.name) {
      case "record":
        const folderState = this.state.folderToggle
        if (!folderState) {
          this.setState({ folderToggle: !folderState, documentToggle: false, workflowToggle: false, activityToggle: false })
        }

        setSearchParam({
          _action: "SEARCHRECORD",
          _id,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Owner Location", value1: sortname }]))
        })
        this.props.setActivePage("record")

        this.props.setNewBread(true, {
          id: e.target.getAttribute('data-breadcrumb'),
          label: e.target.getAttribute('data-breadcrumb'),
          activePage: e.target.getAttribute('data-breadcrumb'),
          isActive: true,
        })
        break

      case "search":
        const docState = this.state.documentToggle
        if (!docState) {
          this.setState({ documentToggle: !docState, folderToggle: false, uploadToggle: false, workflowToggle: false, activityToggle: false})
        }
        this.props.setActivePage("savedSearch")

        this.props.setNewBread(true, {
          id: e.target.getAttribute('data-breadcrumb'),
          label: e.target.getAttribute('data-breadcrumb'),
          activePage: e.target.getAttribute('data-breadcrumb'),
          isActive: true,
        })
        break

      case "upload":
        const upState = this.state.uploadToggle
          this.setState({ uploadToggle: !upState, folderToggle: false, workflowToggle: false, activityToggle: false })
        break 

      case "workflow":
        const workflowState = this.state.workflowToggle
        if (!workflowState) {
          this.setState({ workflowToggle: !workflowState, folderToggle: false, documentToggle: false, uploadToggle: false, locationToggle: false, activityToggle: false })
        }
        const workflow = {
          startDateFrom: '01/01/2000',
          startDateTo: moment(),
          _action: 'SEARCHWORKFLOW',
          _id
        }      
        this.props.populateWorkflow(workflow)
        this.props.setShowFab(false)  // Fav True False
        this.props.setActivePage("listAllWorkflow")

        this.props.setNewBread(true, {
          id: e.target.getAttribute('data-breadcrumb'),
          label: e.target.getAttribute('data-breadcrumb'),
          activePage: e.target.getAttribute('data-breadcrumb'),
          isActive: true,
        })
        break 

      case "activity":
        const activityState = this.state.activityToggle
        if (!activityState) {
          this.setState({ activityToggle: !activityState, folderToggle: false, documentToggle: false, uploadToggle: false, locationToggle: false, workflowToggle: false  })
        }
       
        break 
      default:
    }
  }
  
  setActivePage = e => {
    e.preventDefault()
    const pageName = e.target.getAttribute("data-pagename")
    // console.log(pageName)
    
    const {
      recFetch,
      session: {
        user: { _id:bId, sortname }
      },
      breadcrumb:{isParent}
    } = this.props

    this.props.setActivePage(pageName)

    if(pageName==="location"){

      const stakehList = {
        _action: "LISTLOCATION",
        _id: bId,
      }
      this.props.setStakehType(stakehList)

      //Breadcrumb
      this.props.setNewBread(true, {
        id: e.target.getAttribute('data-breadcrumb'),
        label: e.target.getAttribute('data-breadcrumb'),
        activePage: e.target.getAttribute('data-breadcrumb'),
        isActive: true,
      })   
      
      this.props.setStakehLabel(e.target.getAttribute("data-label"))
      this.props.setStakehSel(null)  // ID stakeholder select to null
      this.props.setShowFab(false) // Fab True false
      // this.props.setStakehNumb(e.target.getAttribute('data-label'))

      this.setState({ uploadToggle: false, folderToggle: false, documentToggle: false, workflowToggle: false })

    }     

    if (pageName==="listOfActivity"){
      const listAct = {
        _action: "LISTACTDUE",
        _id: bId
      }
  
      this.props.setListActDue(listAct)
    }

    if (pageName === "searchWorkflow"){
      this.props.toggleSearchWorkflow(true)
      this.props.setActivePage("searchWorkflow")
    }

    if (pageName === "searchActivity"){
      this.props.toggleSearchActivity(true)
      this.props.setActivePage("searchActivity")
    }

    


    // console.log(pageName)
    // if (pageName === "record") {
    //   const searchParam = {
    //     _action: "SEARCHRECORD",
    //     _id,
    //     searchOrder: 0,
    //     jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Owner Location", value1: sortname }]))
    //   }
    //   recFetch(searchParam, { start: 0 })
    // } else if (pageName === "record") {
    // }
    // console.log(e.target.getAttribute("data-pagename"))
    //   folderrecId= `record_type_ids:['rect-919a34ded12d44559f44914bc15d7725'`
    // documentrecId = `rect-f7eb2eab56b8440a9b436d9fe717fd83'`
  }

  render() {
    const { navBarClass } = this.props.layout
    const {
      user: { sortname: stakehName, usertype: title }
    } = this.props.session
    return (
      <nav className={navBarClass}>
        <div className='side-navbar-wrapper'>
          <div className='sidenav-header d-flex align-items-center justify-content-center'>
            <div className='sidenav-header-inner text-center'>
              <img src={require("../../img/user.svg")} alt='user' className='img-fluid ' />
              <h2 className='h5'>{stakehName}</h2>
              <span>{title}</span>
            </div>
            <div className='sidenav-header-logo'>
              <a className='brand-small text-center' href='/' onClick={this.setActivePage} data-pagename='dashboard'>
                <img src={require("../../img/user.svg")} alt='user' className='img-fluid ' data-pagename='dashboard' />
              </a>
            </div>
          </div>
          <div className='main-menu'>
            <h5 className='sidenav-heading'>Main</h5>
            <ul id='side-main-menu' className='side-menu list-unstyled'>

              {/********************************************************** Record ****************************************************/}

              <li>
                <a
                  href='/'
                  aria-expanded={this.state.folderToggle}
                  data-toggle='collapse'
                  name='record'
                  className={this.state.folderToggle ? "" : "collapsed"}
                  onClick={this.toggleClass}
                  data-breadcrumb='Record'
                >
                  <div className='userIcon'>
                    <img src={require(`../../img/folder.svg`)} alt='doc' className='img-fluid p-1' />
                  </div>
                  Record
                </a>

                <ul id='chartsDropdown' className={this.state.folderToggle ? "collapse list-unstyled show" : "collapse list-unstyled"}>
                  <li>
                    <a href='/' onClick={this.setActivePage} data-pagename='recordCreate'>
                      <div className='userIcon' data-pagename='recordCreate'>
                        <img src={require(`../../img/folder3.svg`)} alt='doc' className='img-fluid p-1' data-pagename='recordCreate' />
                      </div>
                      Create
                    </a>
                  </li>
                </ul>

              </li>

              {/********************************************************** Search ****************************************************/}

              <li>
                {/* Need to chage the a tag so it does not addinh the # on the url */}
                <a
                  href='/'
                  aria-expanded={this.state.documentToggle}
                  data-toggle='collapse'
                  name='search'
                  className={this.state.documentToggle ? "" : "collapsed"}
                  onClick={this.toggleClass}
                  data-breadcrumb='Search'
                >
                  <div className='userIcon'>
                    <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' />
                  </div>
                  Search
                </a>                

              {/********************************************************** Advance Search ****************************************************/}


                <ul id='chartsDropdown' className={this.state.documentToggle ? "collapse list-unstyled show" : "collapse list-unstyled"}>
                  <li>
                    <a href='/' data-pagename='advSearch' onClick={this.setActivePage}>
                      <div className='userIcon' data-pagename='advSearch'>
                        <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' data-pagename='advSearch' />
                      </div>
                      Advance Search
                    </a>
                  </li>
                  {/* <li>
                    <a href='/' data-pagename='formSearch' onClick={this.setActivePage}>
                      <div className='userIcon' data-pagename='formSearch'>
                        <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' data-pagename='formSearch' />
                      </div>
                      Form Search
                    </a>
                  </li> */}

              {/********************************************************** Browse by Classification ****************************************************/}

                  <li>
                    <a href='/' data-pagename='searchClass' onClick={this.setActivePage}>
                      <div className='userIcon' data-pagename='searchClass'>
                        <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' data-pagename='searchClass' />
                      </div>
                      Browse by Classification
                    </a>
                  </li>
                </ul>
              </li>
              
              {/********************************************************** Location ****************************************************/}
              
              <li>    
                <a href="/" onClick={this.setActivePage} data-pagename="location"  data-breadcrumb='Locations' data-label="All Locations">
                  <div className="userIcon" data-pagename="location">
                    <img src={require(`../../img/employee.svg`)} alt="location" className="img-fluid mr-1" />
                  </div>Locations
                </a>           
              </li>

              {/********************************************************** Workflow ****************************************************/}

              <li>
                <a
                  href='/'
                  aria-expanded={this.state.workflowToggle}
                  data-toggle='collapse'
                  name='workflow'
                  className={this.state.workflowToggle ? "" : "collapsed"}
                  onClick={this.toggleClass}
                  data-breadcrumb='List Workflow'
                >
                  <div className='userIcon'>
                    <img src={require(`../../img/workflow.svg`)} alt='workflow' className='img-fluid p-1' />
                  </div>
                  Workflow
                </a>

                <ul id='chartsDropdown' className={this.state.workflowToggle ? "collapse list-unstyled show" : "collapse list-unstyled"}>
                  <li>
                    <a href='/' onClick={this.setActivePage} data-pagename='listOfActivity'>
                      <div className='userIcon' data-pagename='listOfActivity'>
                        <img src={require(`../../img/activity.svg`)} alt='activity' className='img-fluid p-1' data-pagename='listOfActivity' />
                      </div>
                      Activity List Due 
                    </a>
                  </li>

                  <li>
                    <a href='/' onClick={this.setActivePage} data-pagename='searchWorkflow'>
                      <div className='userIcon' data-pagename='searchWorkflow'>
                        <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' data-pagename='searchWorkflow' />
                      </div>
                      Search Workflow
                    </a>
                  </li> 

                   <li>
                    <a href='/' onClick={this.setActivePage} data-pagename='searchActivity'>
                      <div className='userIcon' data-pagename='searchActivity'>
                        <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' data-pagename='searchActivity' />
                      </div>
                      Search Activity
                    </a>
                  </li>        

                </ul>

              </li>

               

            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
SideNav.propTypes = {
  session: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  breadcrumb: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired,
  setStakehType: PropTypes.func.isRequired,
  setShowFab: PropTypes.func.isRequired,
  setStakehLabel: PropTypes.func.isRequired,
  setStakehSel: PropTypes.func.isRequired,
  populateWorkflow: PropTypes.func.isRequired,
  setListActDue: PropTypes.func.isRequired,
  toggleSearchActivity: PropTypes.func.isRequired,
  toggleSearchWorkflow: PropTypes.func.isRequired,
  setNewBread: PropTypes.func.isRequired,
  resetNav: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  session: state.session,
  layout: state.layout,
  breadcrumb: state.breadcrumb
})
export default connect(
  mapStateToProps,
  { 
    setActivePage, 
    setSearchParam, 
    setStakehType,
    setShowFab, 
    setStakehLabel,
    setStakehSel,
    populateWorkflow,
    setListActDue,
    toggleSearchActivity,
    toggleSearchWorkflow,
    setNewBread,
    resetNav
  }
)(SideNav)
