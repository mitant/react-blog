import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../../config'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1 leftHeader">
            <Link to="/about">About</Link>
          </div>
          <div className="col-4 text-center">
            <Link to="/" className="blog-header-logo text-dark">{config.header.pageTitle}</Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <Link to="/contact" className="btn btn-sm btn-outline-secondary">Contact</Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;