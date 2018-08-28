import React, { Component } from 'react';
import SearchContainer from './containers/SearchContainer'
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchContainer />
      </Provider>
    );
  }
}

export default App;
