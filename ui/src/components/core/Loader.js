import React, { Component } from 'react'
import './Loader.css'

class Loader extends Component {
  render() {
    return <div id="loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  }
};

export default Loader;