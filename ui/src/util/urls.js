let urls = {
  getArticleLink(article) {
    return `/articles/${article.created.getFullYear()}/${article.created.getMonth()}/${article.slug}`;
  }
};

export default urls;