import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import urls from '../util/urls'
import { FormattedDate } from 'react-intl'
import Ellipsid from './Ellipsid'
import { requestFeaturedArticles } from '../actions/articles';
import './FeaturedContent.css'

class FeaturedJumboArticle extends Component {
  render() {
    if (this.props.article) {
      return (
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + this.props.article.featuredImage})`, 'backgroundSize': this.props.article.backgroundSize, 'backgroundPosition': this.props.article.backgroundPosition }}>
          <div className="col-md-6 px-0 text-background">
            <h1 className="display-4 font-italic">{this.props.article.title}</h1>
            <p className="lead my-3">{this.props.article.blurb}</p>
            <p className="lead mb-0"><Link to={urls.getArticleLink(this.props.article)} className="text-white font-weight-bold">Continue reading...</Link></p>
          </div>
        </div>);
    } else {
      return <div />
    }
  }
}

class FeaturedCardArticle extends Component {
  render() {
    if (this.props.article) {
      return <div className="card flex-md-row mb-4 box-shadow h-md-250">
        <div className="card-body d-flex flex-column align-items-start">
          <strong className="d-inline-block mb-2 text-primary">{this.props.article.category}</strong>
          <h3 className="mb-0">
            <Link to={urls.getArticleLink(this.props.article)} className="text-dark" href="#"><Ellipsid value={this.props.article.title} length={30} /></Link>
          </h3>
          <div className="mb-1 text-muted"><FormattedDate value={this.props.article.created} /></div>
          <p className="card-text mb-auto"><Ellipsid value={this.props.article.blurb} length={100} /></p>
          <Link to={urls.getArticleLink(this.props.article)}>Continue reading...</Link>
        </div>
        <div className="featured-card-image-container  flex-auto d-md-block card-img-right" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + this.props.article.featuredImage})` }} />
      </div>
    } else {
      return <div />
    }
  }
}

class FeaturedContent extends Component {
  componentDidMount() {
    this.props.dispatch(requestFeaturedArticles({ where: { featurable: true }, limit: 3 }));
  }
  getRandomFeaturedArticles() {
    if (this.props.featuredArticles.length === 0) {
      return [];
    }

    let featuredArticles = [...this.props.featuredArticles];
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(featuredArticles);

    return featuredArticles;
  }
  render() {
    let featuredArticles = this.getRandomFeaturedArticles();

    return (
      <div>
        <FeaturedJumboArticle article={featuredArticles[0]} />
        <div className="row mb-2">
          <div className="col-xs-12 col-lg-6">
            <FeaturedCardArticle article={featuredArticles[1]} />
          </div>
          <div className="col-xs-12 col-lg-6">
            <FeaturedCardArticle article={featuredArticles[2]} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    featuredArticles: state.articles.featuredArticles.filter(article => { return article.featurable; })
  }
}

export default withRouter(connect(mapStateToProps)(FeaturedContent));