import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Select from "react-select"
import { FormGroup, Label } from "reactstrap"

import { fetchObjList } from "../../actions/backendAction"
import { setSearchParam } from "../../actions/searchAction"

export class ComboField extends Component {
  constructor() {
    super()
    this.state = {
      optionList: [{ value: "AND", label: "AND" }, { value: "OR", label: "OR" }],
      optionVal: []
    }
  }
  dataBinder() {
    // const {
    //   conf: { itmParam, query },
    //   setSearchParam
    // } = this.props
    // setSearchParam(itmParam)
    // if (query !== undefined) {
    //   this.setState({ optionVal: { value: query.value1, label: query.value1 } })
    // }
    const {
      conf: { format, query, itmParam },
      setSearchParam
    } = this.props
    if (format !== "operand") {
      if (format !== "accesscontrol") {
        if (format !== "boolean") {
          setSearchParam(itmParam)
          if (query !== undefined) {
            this.setState({ optionVal: { value: query.value1, label: query.value1 } })
          }
        } else {
          this.setState({
            optionList: [{ value: "True", label: "True" }, { value: "False", label: "False" }]
          })
        }
      } else {
        this.setState({
          optionList: [
            { value: "View Document", label: "View Document" },
            { value: "View Metadata", label: "View Metadata" },
            { value: "Update Document", label: "Update Document" },
            { value: "Update Record Metadata", label: "Update Record Metadata" },
            { value: "Modify Record Access", label: "Modify Record Access" },
            { value: "Destroy Record", label: "Destroy Record" },
            { value: "Contribute Contents", label: "Contribute Contents" }
          ]
        })
      }
    } else {
      this.setState({ optionVal: { value: query.op, label: query.op } })
    }
  }
  componentDidMount() {
    // const {
    //   conf: { format, query }
    // } = this.props
    // if (format !== "operand") {
    //   if (format !== "accesscontrol") {
    this.dataBinder()
    //   } else {
    //     this.setState({
    //       optionList: [
    //         { value: "View Document", label: "View Document" },
    //         { value: "View Metadata", label: "View Metadata" },
    //         { value: "Update Document", label: "Update Document" },
    //         { value: "Update Record Metadata", label: "Update Record Metadata" },
    //         { value: "Modify Record Access", label: "Modify Record Access" },
    //         { value: "Destroy Record", label: "Destroy Record" },
    //         { value: "Contribute Contents", label: "Contribute Contents" }
    //       ]
    //     })
    //   }
    // } else {
    //   this.setState({ optionVal: { value: query.op, label: query.op } })
    // }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.conf.format !== this.props.conf.format) {
      // const {
      //   conf: { format, query }
      // } = this.props
      // if (format !== "operand") {
      //   if (format !== "accesscontrol") {
      this.dataBinder()
      //   } else {
      //     this.setState({
      //       optionList: [
      //         { value: "View Document", label: "View Document" },
      //         { value: "View Metadata", label: "View Metadata" },
      //         { value: "Update Document", label: "Update Document" },
      //         { value: "Update Record Metadata", label: "Update Record Metadata" },
      //         { value: "Modify Record Access", label: "Modify Record Access" },
      //         { value: "Destroy Record", label: "Destroy Record" },
      //         { value: "Contribute Contents", label: "Contribute Contents" }
      //       ]
      //     })
      //   }
      // } else {
      //   this.setState({ optionVal: { value: query.op, label: query.op } })
      // }
    } else if (prevProps.searchConf.searchParam !== this.props.searchConf.searchParam) {
      const {
        fetchObjList,
        searchConf: { searchParam }
      } = this.props
      fetchObjList(searchParam, { start: 0 })
    } else if (prevProps.searchConf.objList !== this.props.searchConf.objList) {
      const {
        conf: { format }
      } = this.props
      const { data } = this.props.searchConf.objList
      if (format === "seclevel") {
        this.setState({ optionList: data.map(itm => ({ label: itm.secLevel, value: itm.secLevel })) })
      } else if (format === "lookupset") {
        this.setState({ optionList: data.map(itm => ({ label: itm.lookupitem, value: itm.lookupitem })) })
      } else if (format === "seccaveat") {
        this.setState({ optionList: data.map(itm => ({ label: `${itm.caveatAbv} - ${itm.caveatDesc}`, value: itm.caveatUri })) })
      }
    }
  }
  changeOpVal = val => {
    this.setState({ optionVal: val })
    const { conf, onInputChange } = this.props
    if (conf.format === "operand") {
      const queParam = { format: "operand", query: { op: val.value } }
      onInputChange({ ...queParam, idx: conf.query.idx })
    } else {
      const { title, format, param, query } = conf
      const queParam =
        format !== "accesscontrol" ? { title, format, query: { op: "EQUALS", field: param, value1: val.value } } : { value2: val.value }
      onInputChange(query !== undefined ? { ...queParam, idx: query.idx } : queParam)
    }
  }

  render() {
    const { optionList, optionVal } = this.state
    const { title } = this.props.conf
    console.log(title)
    return (
      <FormGroup>
        <Label>{title !== undefined ? title : "Operand"}</Label>

        <Select
          name='comboBox'
          placeholder={`Select ${title !== undefined ? title : "Operand"}`}
          value={optionVal}
          onChange={this.changeOpVal}
          options={optionList}
        />
      </FormGroup>
    )
  }
}

ComboField.propTypes = {
  session: PropTypes.object.isRequired,
  searchConf: PropTypes.object.isRequired,
  fetchObjList: PropTypes.func.isRequired,
  setSearchParam: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  session: state.session,
  searchConf: state.searchConf
})

export default connect(
  mapStateToProps,
  { fetchObjList, setSearchParam }
)(ComboField)
