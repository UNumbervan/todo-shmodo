import {combineReducers} from 'redux';
import categories from './categories';
import todos from './todos';

const app = combineReducers({
    categories,
    todos
});

export default app;
