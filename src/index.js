import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import TodosList from './containers/todos/TodosList';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/category/:category" component={TodosList}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
