import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from '../core/Sidebar';
import Loader from '../core/Loader';
import Article from '../Article';

import { getArticleCount, requestArticles } from '../../actions/articles';

class PaginationButtons extends Component {
  render() {
    if (this.props.articleCount <= this.props.limit) {
      return null;
    }

    return <nav className="blog-pagination">
      <button className={`btn btn-outline-primary${this.props.offset + this.props.limit >= this.props.articleCount ? " disabled" : ""}`} onClick={(e) => { this.props.onPrev(e); }}>Older</button>
      <button className={`btn btn-outline-secondary${this.props.offset < 1 ? " disabled" : ""}`} onClick={(e) => { this.props.onNext(e); }}>Newer</button>
    </nav>
  }
};

class ArticleListing extends Component {
  render() {
    if (this.props.articles.length === 0) {
      return <p>No articles yet.</p>
    }

    return this.props.articles.map((article, idx) => {
      return <Article key={idx} article={article} />
    });
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'created desc',
      offset: 0,
      limit: 3
    }
  }
  updateOffset(e, diff) {
    if (this.state.offset + diff < 0) {
      return;
    }

    if (this.state.offset + diff >= this.props.articleCount) {
      return;
    }

    let newState = {
      ...this.getQuery(this.props),
      offset: this.state.offset + diff
    };
    this.setState(newState);

    this.props.dispatch(requestArticles({ ...newState }));
  }
  getQuery(props) {
    let query = { ...this.state };
    if (props.match.params.tag) {
      query["where"] = {
        tags: {
          inq: [props.match.params.tag]
        }
      };
    }

    if (props.match.params.year && props.match.params.month) {
      let year = parseInt(props.match.params.year, 10);
      let month = parseInt(props.match.params.month, 10);

      let startDate = new Date(`${year}-${month}-01`);
      let endDate = month === 12 ? new Date(`${year + 1}-01-01`) : new Date(`${year}-${month + 1}-01`);

      if (!query["where"]) {
        query["where"] = {};
      }
      query["where"]["created"] = {
        between: [startDate, endDate]
      };
    }

    return query;
  }
  loadArticles(props) {
    let query = this.getQuery(props);

    this.props.dispatch(getArticleCount(query));
    this.props.dispatch(requestArticles(query));
  }
  componentWillMount() {
    this.loadArticles(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tag !== nextProps.match.params.tag
      || this.props.match.params.year !== nextProps.match.params.year
      || this.props.match.params.month !== nextProps.match.params.month) {
      this.setState(
        {
          ...this.state,
          offset: 0
        },
        () => {
          this.loadArticles(nextProps);
        }
      );
    }
  }
  render() {
    if (this.props.loading) {
      return <Loader />
    }
    return (
      <div className="row">
        <div className="col-md-8 blog-main">
          <h3 className="pb-3 mb-4 font-italic border-bottom">
            From the Firehose
            </h3>
          <ArticleListing articles={this.props.articles} />
          <PaginationButtons
            offset={this.state.offset}
            limit={this.state.limit}
            articleCount={this.props.articleCount}
            onNext={(e) => { this.updateOffset(e, -1 * this.state.limit) }}
            onPrev={(e) => { this.updateOffset(e, this.state.limit) }} />
        </div>
        <Sidebar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles,
    articleCount: state.articles.articleCount,
    loading: state.articles.loading
  }
}

export default withRouter(connect(mapStateToProps)(Home));