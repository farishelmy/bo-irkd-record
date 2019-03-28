import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { setActivePage } from "../../actions/layoutInitAction"

import { setSearchParam } from "../../actions/searchAction"
class SideNav extends React.Component {
  constructor() {
    super()
    this.state = {
      folderToggle: false,
      documentToggle: false,
      uploadToggle: false
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
          this.setState({ folderToggle: !folderState, documentToggle: false })
        }

        setSearchParam({
          _action: "SEARCHRECORD",
          _id,
          searchOrder: 0,
          jsonQuery: encodeURIComponent(JSON.stringify([{ op: "EQUALS", field: "&&Owner Location", value1: sortname }]))
        })
        this.props.setActivePage("record")
        break
      case "search":
        const docState = this.state.documentToggle
        if (!docState) {
          this.setState({ documentToggle: !docState, folderToggle: false, uploadToggle: false })
        }
        this.props.setActivePage("savedSearch")
        break
      case "upload":
        const upState = this.state.uploadToggle
        this.setState({ uploadToggle: !upState, folderToggle: false })
        break
    }
  }
  setActivePage = e => {
    e.preventDefault()
    const pageName = e.target.getAttribute("data-pagename")
    const {
      recFetch,
      session: {
        user: { _id, sortname }
      }
    } = this.props

    this.props.setActivePage(pageName)
    console.log(pageName)
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
              <li>
                <a
                  href='/'
                  aria-expanded={this.state.folderToggle}
                  data-toggle='collapse'
                  name='record'
                  className={this.state.folderToggle ? "" : "collapsed"}
                  onClick={this.toggleClass}
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
              <li>
                {/* Need to chage the a tag so it does not addinh the # on the url */}
                <a
                  href='/'
                  aria-expanded={this.state.documentToggle}
                  data-toggle='collapse'
                  name='search'
                  className={this.state.documentToggle ? "" : "collapsed"}
                  onClick={this.toggleClass}
                >
                  <div className='userIcon'>
                    <img src={require(`../../img/loupe.svg`)} alt='doc' className='img-fluid p-1' />
                  </div>
                  Search
                </a>
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
  setActivePage: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  session: state.session,
  layout: state.layout
})
export default connect(
  mapStateToProps,
  { setActivePage, setSearchParam }
)(SideNav)
