import React, { Component, Fragment } from "react"

import { connect } from "react-redux"
import PropTypes from "prop-types"
import posed, { PoseGroup } from "react-pose"

import { setNavToggle, setPageClass, setSideNavClass } from "../actions/layoutInitAction"
import { Footer, SideNav, TopNav } from "../components/layout"

import Dashboard from "./dashboard"
import Breadcrumb from "./layout/Breadcrumb"
import Record from "./record"
import RecCreate from "./record/recType"
import RecEditor from "./record/recEditor"
import Search from "./search"
import SearchClass from "./search/searchClass"
import AdvSearch from "./search/advSearch"

import location from "./location/index"
import viewLoc from "./location/view/ViewDetail"



const AnimeCont = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    delay: 300,
    transition: {
      x: { type: "spring", stiffness: 1500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { duration: 150 }
  }
})

class Home extends Component {
  components = {
    dashboard: Dashboard,
    record: Record,
    recordCreate: RecCreate,
    recEdit: RecEditor,
    search: Search,
    savedSearch: Search,
    advSearch: AdvSearch,
    // formSearch: RecCreate,
    searchClass: SearchClass,

    //Location
    location: location,
    viewLocation: viewLoc
    
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }
  updateDimensions = () => {
    const windowWidth = window.innerWidth
    const pageClass = windowWidth > 1194 ? "page active" : "page active-sm"
    const navClass = windowWidth > 1194 ? "side-navbar shrink" : "side-navbar show-sm"

    this.props.setNavToggle(false, pageClass, navClass)
  }
  render() {
    const { pageClass, activePage } = this.props.layout
    const Activepage = this.components[activePage]
    return (
      <Fragment>
        <SideNav />
        <div className={pageClass}>
          <TopNav />
          <Breadcrumb />
          <PoseGroup>
            <AnimeCont key={activePage}>
              <Activepage />
            </AnimeCont>
          </PoseGroup>
          <Footer />
        </div>
      </Fragment>
    )
  }
}
Home.propTypes = {
  layout: PropTypes.object.isRequired,
  setNavToggle: PropTypes.func.isRequired,
  setPageClass: PropTypes.func.isRequired,
  setSideNavClass: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  layout: state.layout
})
export default connect(
  mapStateToProps,
  { setPageClass, setSideNavClass, setNavToggle }
)(Home)
