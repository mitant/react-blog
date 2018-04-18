import fetch from 'cross-fetch';
import config from '../config';

export const SET_ARTICLE_COUNTS_BY_YEAR_MONTH = 'SET_ARTICLE_COUNTS_BY_YEAR_MONTH'
export const getArticleCountsByYearMonth = (where) => {
  return async (dispatch) => {
    let filter = {
      fields: {
        created: true
      }
    }

    if (where) {
      filter = { ...filter, where };
    }

    let query = `${config.API_ROOT}/articles?filter=${JSON.stringify(filter)}`;

    const response = await fetch(query);
    const json = await response.json();

    let articleCountsByYearMonth = json.reduce((acc, val) => {
      let created = new Date(val.created);
      let year = created.getFullYear();
      let month = created.getMonth() + 1;

      if (!acc[year]) {
        acc[year] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      };

      acc[year][month]++;
      return acc;
    }, {})

    dispatch({
      type: SET_ARTICLE_COUNTS_BY_YEAR_MONTH,
      articleCountsByYearMonth
    });
  }
}

export const SET_LOADING = 'SET_LOADING'
export const loadingStart = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING,
      loading: true
    })
  }
}

export const loadingEnd = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING,
      loading: false
    })
  }
}

export const SET_ARTICLES_COUNT = 'SET_ARTICLES_COUNT'
export const getArticleCount = (filter) => {
  return async (dispatch) => {
    try {
      let query = `${config.API_ROOT}/articles/count${filter.where ? `?where=${JSON.stringify(filter.where)}` : ''}`;

      const response = await fetch(query);
      const json = await response.json();

      dispatch({
        type: SET_ARTICLES_COUNT,
        articleCount: json.count
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const requestArticles = (filter) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());

      const url = `${config.API_ROOT}/articles?filter=${JSON.stringify(filter)}`;
      const response = await fetch(url);
      const json = await response.json();

      dispatch({
        type: REQUEST_ARTICLES,
        articles: json
      });

      dispatch(loadingEnd());
    } catch (e) {
      console.log(e);
    }
  };
}

export const SET_FEATURED_ARTICLES = 'SET_FEATURED_ARTICLES'
export const requestFeaturedArticles = (filter) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());

      const url = `${config.API_ROOT}/articles?filter=${JSON.stringify(filter)}`;

      const response = await fetch(url);
      const json = await response.json();

      dispatch({
        type: SET_FEATURED_ARTICLES,
        articles: json
      });

      loadingEnd()
    } catch (e) {
      console.log(e);
    }
  };
}

export const SET_FULL_ARTICLE = 'SET_FULL_ARTICLE'
export const requestFullArticle = (filter) => {
  return async (dispatch) => {
    try {
      dispatch(loadingStart());

      const url = `${config.API_ROOT}/articles/findOne?filter=${JSON.stringify(filter)}`;

      const response = await fetch(url);
      const json = await response.json();

      dispatch({
        type: SET_FULL_ARTICLE,
        article: json
      });

      dispatch(loadingEnd());
    } catch (e) {
      console.log(e);
    }
  };
}