import React, { Component } from 'react';

class Ellipsid extends Component {
  trim(s, length) {
    let result = "";
    let words = s.split(" ");

    let count = 0;
    for (let i = 0; i < words.length; ++i) {
      if (result.length + words[i].length < length) {
        if (i !== 0) {
          result += " ";
        }
        result += words[i];
        count = i;
      } else {
        break;
      }
    }

    if (count !== words.length - 1) {
      result += " ...";
    }

    return result;
  }
  render() {
    return <span>{this.trim(this.props.value, this.props.length)}</span>
  }
}

export default Ellipsid;