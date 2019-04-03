import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ItemLising from "../search/advSearch/ItemLising"

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupButtonDropdown,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap"
export class TextModal extends Component {
  constructor() {
    super()
    this.state = {
      dropdownOpen: false,
      modalShow: false,
      listingType: null,
      textVal: ""
    }
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }
  toggleModal = () => {
    this.setState({ modalShow: !this.state.modalShow })
  }
  setList = e => {
    const dataType = e.target.getAttribute("data-listType")
    this.setState({ listingType: dataType, modalShow: true })
  }
  getSelItem = val => {
    const {
      conf: { name },
      onInputChange
    } = this.props
    this.setState({ textVal: val, modalShow: false })
    onInputChange({ name, value: val })
  }

  render() {
    const {
      session: {
        user: { _id }
      },
      conf: { title, modalType, incoming }
    } = this.props
    // console.log(modalType)
    const { modalShow, listingType, textVal } = this.state
    return (
      <FormGroup>
        <Label>{title}</Label>
        <InputGroup>
          <Input
            readOnly
            //onBlur={sendVal}
            // name={custom_field_id}
            type='text'
            value={textVal}
            placeholder={`Select Value for ${title}`}
          />
          {modalType === "location" ? (
            <InputGroupAddon addonType='prepend'>
              <Button className='btn btn-info' onClick={this.toggleModal}>
                <img src={require(`../../img/user-group.svg`)} className={"img-fluid img-icn"} alt={title} />
              </Button>
            </InputGroupAddon>
          ) : (
            <InputGroupButtonDropdown addonType='append' isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
              <DropdownToggle caret className='btn btn-info dropdown-toggle'>
                <img src={require(`../../img/search-in-folder.svg`)} className={"img-fluid img-icn mr-2"} alt={title} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem data-listtype='savedSearch' onClick={this.setList}>
                  Saved Search
                </DropdownItem>
                <DropdownItem data-listtype='advSearch' onClick={this.setList}>
                  Advance Search
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem data-listtype='classification' onClick={this.setList}>
                  Browse by Classification
                </DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          )}
          <Modal isOpen={this.state.modalShow} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader className='text-capitalize' toggle={this.toggleModal}>
              {modalType}
            </ModalHeader>
            <ModalBody className='modal-list'>
              {modalShow ? (
                modalType === "location" ? (
                  <ItemLising conf={{ itmParam: { _action: "LISTLOCATION", _id }, format: "location", incoming }} selItem={this.getSelItem} />
                ) : listingType === "classification" ? (
                  <ItemLising
                    conf={{ itmParam: { _action: "LISTCLASSIFICATION", _id }, format: "classification", incoming }}
                    selItem={this.getSelItem}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={this.toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </InputGroup>
      </FormGroup>
    )
  }
}
TextModal.propTypes = {
  session: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(TextModal)
