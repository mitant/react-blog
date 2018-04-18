import React from 'react';
import SinglePageLayout from '../layout/SinglePageLayout';

class About extends SinglePageLayout {
  constructor(props) {
    super(props);

    this.title = "About React Blog";
    this.content = <div>
      <p>React blog!</p>
    </div>;
  }
}

export default About;