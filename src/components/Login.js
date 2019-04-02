import React, { Component } from "react"
// import Alert from 'react-s-alert'
// import failed from '../mp3/failed.mp3'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login } from "../actions/authAction"

const imageUrl = require(`../img/loginbg.jpg`)
const styles = {
  header: {
    backgroundImage: `url(${imageUrl})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  content: {
    height: "100%",
    width: "100%",
    background: "linear-gradient(to right bottom, rgba(157, 176, 219, 0.8), #FFD3AE)",
    color: "white"
  },
  form: {
    maxWidth: "80%"
  },
  input: {
    outline: 0,
    width: "100%",
    border: 0,
    padding: "15px",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    fontSize: "14px",
    margin: "0 0 15px",
    boxSizing: "border-box"
  },
  innerForm: {
    background: "rgba(0,0,0,0)",
    boxShadow: "none"
  }
}
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onUsrFocus: false,
      onPssFocus: false,
      redirectToReferrer: false
    }
  }
  setUserState(usrData) {
    const jsonResult = usrData.results[0]
    if (usrData.success && usrData.code === 200) {
      if (typeof Storage !== "undefined") {
        sessionStorage.bio_access_id = jsonResult.bio_access_id
        sessionStorage.stakeholder_id = jsonResult.stakeholder_id
        sessionStorage.stakeholder_name = jsonResult.stakeholder_name
        sessionStorage.designation = jsonResult.roles[0].title
        sessionStorage.setItem("isAuth", true)

        localStorage.getItem(jsonResult.stakeholder_id) === null
          ? localStorage.setItem(jsonResult.stakeholder_id, JSON.stringify({ editRec: [], searchKey: [] }))
          : console.log("profile found")
      } else {
        console.log("browser not support session storage")
      }
    } else {
      console.log("err")
    }

    this.setState({ redirectToReferrer: true })
  }
  authUser = e => {
    e.preventDefault()
    const usrInput = e.target.loginUsername.value,
      saperatorIdx = usrInput.indexOf("@"),
      usrName = usrInput.substr(0, saperatorIdx),
      repoName = usrInput.substr(saperatorIdx + 1)

    const loginObj = {
      _action: "login",
      username: usrName,
      password: e.target.loginPassword.value,
      datasetid: repoName

      // language_id:"en_US"
    }
    this.props.login(loginObj)
    // let url = '../bioris-web/Login?param='+JSON.stringify(loginObj)
    // fetch(url ,{
    // headers:{
    //     'Content-Type':'application/json'
    // },
    //   method:'GET',
    //   credentials: 'same-origin'
    // })
    // .then(res=>res.json())
    // .then((data)=>{
    //       data.code===200?
    //       this.setUserState(data)
    //       :
    //       Alert.error(data.message, {
    //         position: 'bottom-right',
    //         effect: 'jelly',
    //         beep: failed,
    //         timeout: 3000
    //       })

    //     })
  }
  render() {
    return (
      <div className='page login-page' style={styles.header}>
        <div style={styles.content}>
          <div className='form-outer d-flex align-items-center m-0'>
            <div className='form-inner' style={styles.innerForm}>
              <div className='logo text-uppercase'>
                <strong className='text-primary'>
                  <span className='text-light'>i</span>Rekod
                </strong>
              </div>
              <p className='text-light'>iRekod is not simply a tool but it lets a user manage access, track and edit information stored.</p>

              <form style={styles.form} onSubmit={this.authUser}>
                <div className='form-group'>
                  <input style={styles.input} type='text' name='loginUsername' className='form-control' placeholder='Username' />
                </div>
                <div className='form-group'>
                  <input style={styles.input} type='password' name='loginPassword' className='form-control' placeholder='Password' />
                </div>
                <div className='form-group'>
                  <button type='submit' style={styles.input} className='btn btn-primary btn-block'>
                    Login
                  </button>
                </div>
              </form>
              <p>
                <a href='http://www.bizobjek.com' className='text-light'>
                  Copyright © 2018 BIZ OBJEK SDN BHD All rights reserved
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* <Alert stack={{limit: 3}} /> */}
      </div>
    )
  }
}

Login.propTypes = {
  session: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  session: state.session
})
export default connect(
  mapStateToProps,
  { login }
)(Login)
