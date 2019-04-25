import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Select from "react-select";
import "rc-pagination/assets/index.css";

import { setActivePage } from "../../actions/layoutInitAction";
import UploadForm from "../record/UploadForm";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class CheckInForm extends Component {
  constructor() {
    super();
    this.state = {
      RevOpt: [],
      valRev: [],
      checkIn: null,
      conf: null,
      comments: null,
      file: []
    };
  }

  componentWillMount() {
    const { checkIn, conf } = this.props;
    const opt = [
      { value: "Make New Revision", label: "Make New Revision" },
      { value: "Replace Current Revision", label: "Replace Current Revision" }
    ];
    this.setState({
      RevOpt: opt,
      checkIn: checkIn,
      conf: conf
    });
  }

  // componentWillUpdate(prevState){
  //   if()

  // }

  toggle = () => {
    const { checkIn } = this.state;
    this.props.closedModal(!checkIn);
  };

  handleChange = e => {
    const inputName = e.target.getAttribute("name");
    const inputVal = e.target.value;
    // ===""?e.target.value=null:e.target.value
    // console.log(e.target.value)

    this.setState({
      [inputName]: inputVal
    });
    // console.log(inputName)
    //  console.log(inputVal)
  };

  handleSelectChange = val => {
    const { value, label } = val;
    // console.log(value)
    this.setState({ valRev: value });
  };

  upload = val => {
    console.log(val)
    // this.setState({file:val})
  };

  submitForm = (val) => {
    const {
      session: {
        user: { _id }
      },
    } = this.props;
    const { comments, valRev,file } = this.state;
    // this.props.recWorkflow({ _action: "INITIATEWF",  workflowName: workflowName, _recordNo: conf["Record Number"], _id, template: tempVal })
    console.log({ comments: comments, Revision: valRev, files: val, _id });
    // this.props.toggleCheckIn(!showCheckIn)
  
  };

  render() {
    const { RevOpt, conf, checkIn } = this.state;

    return (
      <div>
        <Modal
          isOpen={checkIn}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form>
            <ModalHeader toggle={this.toggle}>
              Check In: {conf["Record Number"]}{" "}
            </ModalHeader>
            <ModalBody>
         
              <UploadForm conf={conf} onInputChange={this.upload} />

              <FormGroup>
                <Label>Revision</Label>
                <Select
                  placeholder="Revision"
                  options={RevOpt}
                  onChange={this.handleSelectChange}
                />
              </FormGroup>

              <FormGroup>
                <Label>Comments</Label>
                <Input
                  name="comments"
                  type="textarea"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={this.submitForm}>
                Save
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
CheckInForm.propTypes = {
  session: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  session: state.session,
  record: state.rec
});
export default connect(
  mapStateToProps,
  {
    setActivePage
  }
)(CheckInForm);
