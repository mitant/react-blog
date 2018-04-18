import React from 'react';
import SinglePageLayout from '../layout/SinglePageLayout';

import config from '../../config'

class Contact extends SinglePageLayout {
  constructor(props) {
    super(props);

    this.title = "Contact";
    this.content = <div>
      <p className="lead">The best way to contact me is through my LinkedIn account.</p>
      <a href={config.contact.linkedIn} target="_blank" rel="noopener noreferrer">
        <img src="https://static.licdn.com/scds/common/u/img/webpromo/btn_myprofile_160x33.png" width="160" height="33" border="0" alt="Viewprofile on LinkedIn" />
      </a>
    </div>;
  }
}

export default Contact;