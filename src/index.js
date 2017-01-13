import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, compose} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import TodosList from './containers/todos/TodosList';
import Todo from './containers/todo/Todo';
import persistState from 'redux-localstorage'
import {directoryDeletionRedirect} from './store-enhancers/directory-deletion-redirect';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    persistState(),
    directoryDeletionRedirect()
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="category/:category" component={({children}) => (<div>{children}</div>)}>
                    <Route path="task/:task" component={Todo}/>
                    <IndexRoute component={TodosList}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
