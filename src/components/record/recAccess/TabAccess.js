import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FormGroup, Label, Col, Button } from "reactstrap";

import SecurityLevel from '../recAccess/SecurityLevel'
import SecurityCaveats from '../recAccess/SecurityCaveats'
import AccessControl from '../recAccess/AccessControl'



import { recSecCav} from "../../../actions/backendAction"
 


export class TabAccess extends Component {
  constructor() {
    super();
    this.state = {
      access:[],
      secLevel:null,
      caveats:[],
    };
  }

  componentWillMount() {
    const {      
      recConf, 
      recAcc:{ 
        secLevel,
        sec
      },  
      recSecCav      
    } = this.props.record
    this.setState({
      access:sec,
      secLevel:secLevel,
      caveats:recSecCav 
    })
   
         
  }

  getCaveats=()=>{
    console.log("test")
    const {
      session: {
        user: { _id }
      }
    } = this.props    
    this.props.recSecCav({ _action:"GETCAVEATS", _id})
  }

   

  render() {
    const { access, caveats, secLevel } = this.state
    console.log(secLevel)
    const securityLevel = <SecurityLevel conf={secLevel} /> 
    const securityCaveats = <SecurityCaveats conf={caveats} onInputChange={this.getCaveats} />
    const accessControl = <AccessControl conf={access} />
    

    return (
      <div>
        <h1 className="h3 display text-primary text-center">Access</h1>
        <Col md={4}>
          {securityLevel}
        </Col>

        <Col>
          <FormGroup>
           {securityCaveats}
          </FormGroup>      

          <FormGroup>
            {accessControl}
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
  record: PropTypes.object.isRequired, 
  recSecCav: PropTypes.func.isRequired, 
};

const mapStateToProps = state => ({
  session: state.session,
  record: state.rec
});

export default connect(
  mapStateToProps,
  { recSecCav }
)(TabAccess);
