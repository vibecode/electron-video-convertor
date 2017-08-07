import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers';
import VideoSelectScreen from './components/VideoSelectScreen';
import ConvertScreen from './components/ConvertScreen';

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/convert" component={ConvertScreen} />
            <Route path="/" component={VideoSelectScreen} />
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
);

