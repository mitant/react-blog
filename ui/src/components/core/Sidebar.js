import React, { Component } from 'react';

import SidebarArchives from './SidebarArchives';
import config from '../../config'

class Sidebar extends Component {
  render() {
    return (
      <aside className="col-md-4 blog-sidebar">
        <div className="p-3 mb-3 bg-light rounded">
          <h4 className="font-italic">About</h4>
          {config.aboutAuthor}
        </div>
        <SidebarArchives />
        <div className="p-3">
          <h4 className="font-italic">Elsewhere</h4>
          <ol className="list-unstyled">
            {config.contact.gitHub && <li><a href={config.contact.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
            {config.contact.linkedIn && <li><a href={config.contact.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
          </ol>
        </div>
      </aside>
    );
  }
}

export default Sidebar;