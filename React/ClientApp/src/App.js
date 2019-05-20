import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ShortLinkGenerator } from './components/ShortLinkGenerator';
import { LinkList } from './components/LinkList';
import { Search } from './components/Search'
import { SearchForm } from './components/SearchForm'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/linkslist' component={LinkList} />
            <Route path='/generator' component={ShortLinkGenerator} />
            <Route path='/tags' component={Search} />
            <Route path='/search' component={SearchForm} />
      </Layout>
    );
  }
}
