import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './Nav.css'

class Nav extends Component {
  render() {
    return (
      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          {
            this.props.categories.map((nav, idx) => {
              let className = "p-2 text-muted";
              if (this.props.match.params.tag === nav.tag) {
                className += " active";
              }
              
              return <Link key={idx} to={`/categories/${nav.tag}`} className={className}>{nav.title}</Link>
            })
          }
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps)(Nav));