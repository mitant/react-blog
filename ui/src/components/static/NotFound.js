import React from 'react';
import SinglePageLayout from '../layout/SinglePageLayout';

class NotFound extends SinglePageLayout {
  constructor(props) {
    super(props);

    this.title = "404";
    this.content = <div>
      <p>Doh! <code>{props.location.pathname}</code> doesn't exist.</p>
    </div>;
  }
}

export default NotFound;