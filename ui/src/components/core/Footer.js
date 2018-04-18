import React, { Component } from 'react';
import config from '../../config'

class Footer extends Component {
  render() {
    return (
      <footer className="blog-footer">
        <p>{config.footerSiteName} &copy;{new Date().getFullYear()}</p>
      </footer>
    );
  }
}

export default Footer;