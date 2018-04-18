import React from 'react';
import { Link } from 'react-router-dom';

let config = {
  API_ROOT: 'http://localhost:3001/api',
  footerSiteName: "React Blog",
  categories: [
  {
    title: "etc.",
    tag: "etc"
  }],
  aboutAuthor: <div>
    <p className="mb-0">The author loves react-blog!</p>
    <p><Link to="/about">Read more...</Link></p>
  </div>,
  contact: {
    linkedIn: "",
    gitHub: "https://github.com/mitant/react-blog"
  },
  header: {
    pageTitle: "React Blog"
  }
}

try {
  var localConfig = require('./config.local');
  config = localConfig.default;
} catch (e) {

}

if (process.env.NODE_ENV === 'development') {
  try {
    var devConfig = require('./config.dev');
    config = devConfig.default;
  } catch (e) {

  }
}


export default config;