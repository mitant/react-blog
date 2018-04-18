import React, { Component } from 'react';
import { FormattedDate } from 'react-intl'

class Article extends Component {
  render() {
    return <div className="blog-post">
      <h2 className="blog-post-title">{this.props.article.title}</h2>
      <p className="blog-post-meta">
        <span className="blog-post-meta-date"><FormattedDate value={this.props.article.created} /></span> <span className="blog-post-meta-tags">{this.props.article.tags.map((tag, idx) => { return <span key={idx} className="badge badge-light">{tag}</span> })}</span>
      </p>
      {this.props.article.featuredImage &&
        <img className="img-fluid" src={process.env.PUBLIC_URL + this.props.article.featuredImage} alt={this.props.article.blurb} />}
      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: this.props.article.content }} />
    </div>
  }
}

export default Article;