import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Sidebar from '../core/Sidebar';
import Article from '../Article';

import { requestFullArticle } from '../../actions/articles';

class ArticleFull extends Component {
  componentDidMount() {
    this.props.dispatch(requestFullArticle({ where: { slug: this.props.match.params.slug } }));
  }
  render() {
    return <div className="row">
      <div className="col-sm">
        <div className="row">
          <div className="col-md-8 blog-main">
            <Article article={this.props.article} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    article: state.articles.fullArticle
  }
}

export default withRouter(connect(mapStateToProps)(ArticleFull));