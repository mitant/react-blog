import { SET_ARTICLE_COUNTS_BY_YEAR_MONTH, REQUEST_ARTICLES, SET_ARTICLES_COUNT, SET_FEATURED_ARTICLES, SET_FULL_ARTICLE, SET_LOADING } from '../actions/articles';

const initArticle = (article => {
  return {
    ...article,
    created: new Date(article.created)
  }
});

function articles(state = {
  articles: [],
  featuredArticles: [],
  fullArticle: {
    title: "",
    created: new Date(),
    tags: []
  },
  articleCount: 0,
  loading: true,
  articleCountsByYearMonth: {}
}, action) {
  switch (action.type) {
    case SET_ARTICLE_COUNTS_BY_YEAR_MONTH:
      return {
        ...state,
        articleCountsByYearMonth: action.articleCountsByYearMonth
      };
    case SET_ARTICLES_COUNT:
      return {
        ...state,
        articleCount: action.articleCount
      };
    case REQUEST_ARTICLES:
      return {
        ...state,
        articles: action.articles.map(initArticle)
      };
    case SET_FEATURED_ARTICLES:
      return {
        ...state,
        featuredArticles: action.articles.map(initArticle)
      };
    case SET_FULL_ARTICLE:
      return {
        ...state,
        fullArticle: action.article
      };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state
  }
}

export default articles;