import React, { Component } from "react"
import { Provider } from "react-redux"
import store from "./store"

import Viewport from "./components/Viewport"

import "./App.css"
import "font-awesome/css/font-awesome.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/style.sea.premium.css"
import "rc-pagination/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Viewport />
      </Provider>
    )
  }
}

export default App
