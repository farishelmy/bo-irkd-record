import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import Tooltip from "rc-tooltip";
import Select from "react-select";
import { FormGroup, Label, Col, Button } from "reactstrap";

// import ComboField from '../../dynComp/ComboField'

export class TabAccess extends Component {
  constructor() {
    super();
    this.state = {
      optionSec: [],
      secVal: null
    };
  }

  componentWillMount() {
    const { conf } = this.props;

    if (conf.secLevel === "") {
      this.setState({
        secVal: null
      });
    } else {
      this.setState({
        secVal: [{ value: conf.secLevel, label: conf.secLevel }]
      });
    }

    this.setState({
      optionSec: [
        { value: "Terbuka", label: "Terbuka" },
        { value: "Terhad", label: "Terhad" },
        { value: "Sulit", label: "Sulit" }
      ]
    });
  }

  handleChange = val => {
    console.log(val.label);
    this.setState({
      secVal: [
        {
          value: val.value,
          label: val.label
        }
      ]
    });
  };

  render() {
    const { optionSec, secVal } = this.state;
    //   const a = this.props.conf

    return (
      <div>
        <h1 className="h3 display text-primary text-center">Access</h1>
        <Col md={4}>
          <FormGroup>
            <Label>Security Level: </Label>
            <Select
              name="comboBox"
              placeholder="Security Level"
              options={optionSec}
              onChange={this.handleChange}
              value={secVal}
            />
          </FormGroup>
        </Col>

        <Col md={12}>
          <FormGroup>
            <div className="row">
              <div className="col-auto mr-auto form-group ">
                <label>Active Security Caveats:</label>
              </div>

              <div className="col-auto">
                <span>
                  <Tooltip
                    overlay={
                      <div
                        style={{
                          height: 20,
                          width: "100%",
                          textAlign: "center"
                        }}
                      >
                        Add Security Caveats
                      </div>
                    }
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  >
                    <img
                      src={require("../../../img/addBtn.svg")}
                      alt="addTask"
                      className="btn btn-link"
                      onClick={this.handleAddRowAdditionalTask}
                    />
                  </Tooltip>
                </span>
              </div>
            </div>

            <div className="card bg-light">
              <table className="table table-hover mb-3">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                        <Select 
                            name="addTask" 
                            placeholder="Title" 
                        />
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Access Control:</Label>
            <Select
              name="comboBox"
              placeholder="Security Level"
              options={optionSec}
              onChange={this.handleChange}
              value={secVal}
            />
          </FormGroup>
        </Col>

        <Col>
        <FormGroup>
          <Button className='btn btn-primary' >
            Save
          </Button>
        </FormGroup>
        </Col>
      </div>
    );
  }
}

TabAccess.propTypes = {
  session: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  session: state.session,
  record: state.rec
});

export default connect(
  mapStateToProps,
  {}
)(TabAccess);
