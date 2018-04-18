import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import { getArticleCountsByYearMonth } from '../../actions/articles'

class SidebarArchives extends Component {
  componentDidMount() {
    let where = null;

    if (this.props.match.params.tag) {
      where = {
        tags: {
          inq: [this.props.match.params.tag]
        }
      }
    }

    this.props.dispatch(getArticleCountsByYearMonth(where));
  }
  getMonthName(monthNumber) {
    monthNumber = parseInt(monthNumber, 10);
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="p-3">
        <h4 className="font-italic">{this.props.match.params.tag && "Section"} Archives</h4>
        <ol className="list-unstyled mb-0">
          {
            Object.keys(this.props.articleCountsByYearMonth).sort((a, b) => { return parseInt(a, 10) < parseInt(b, 10); }).map((year) => {
              return this.props.articleCountsByYearMonth[year].map((monthCount, month) => {
                if (monthCount > 0) {
                  let target = `/articles/${year}/${month}`;
                  if (this.props.match.params.tag) {
                    target = `/articles/${year}/${month}/categories/${this.props.match.params.tag}`
                  }

                  return <li key={year + month}>
                    <Link to={target}>{year} - {this.getMonthName(month)}</Link>
                  </li>
                } else {
                  return null;
                }
              });
            })
          }
        </ol>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articleCountsByYearMonth: state.articles.articleCountsByYearMonth
  }
}

export default withRouter(connect(mapStateToProps)(SidebarArchives));