import React, { Component } from 'react';

class SinglePageLayout extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm">
          <h1>{this.title}</h1>
          {this.content}
        </div>
      </div>
    );
  }
}

export default SinglePageLayout;