import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducers from './reducers'
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import Header from './components/core/Header';
import Nav from './components/core/Nav';
import Footer from './components/core/Footer';
import Home from './components/pages/Home';
import About from './components/static/About';
import FeaturedContent from './components/FeaturedContent';
import Contact from './components/static/Contact';
import NotFound from './components/static/NotFound';
import ArticleFull from './components/pages/ArticleFull';

addLocaleData([...en]);

const history = createHistory()
const middleware = [routerMiddleware(history), thunk]

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
)

class Page extends React.Component {
  render() {
    return <div>
      <div className="container">
        <Header />
        <Nav />
        <Route exact path="/" component={FeaturedContent} />
      </div>
      <main role="main" className="container">
        {this.props.children}
      </main>
      <Footer />
    </div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" render={() => <Page><Home /></Page>} />
          <Route exact path="/about" render={() => <Page><About /></Page>} />
          <Route exact path="/contact" render={() => <Page><Contact /></Page>} />
          <Route path="/categories/:tag" render={() => <Page><Home /></Page>} />
          <Route exact path="/articles/:year/:month/:slug" render={() => <Page><ArticleFull /></Page>} />
          <Route exact path="/articles/:year/:month" render={() => <Page><Home /></Page>} />
          <Route exact path="/articles/:year/:month/categories/:tag" render={() => <Page><Home /></Page>} />
          <Route render={() => <Page><NotFound /></Page>} />
        </Switch>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();