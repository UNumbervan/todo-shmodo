import {connect} from 'react-redux';
import {TodosList} from './../../components/todos/TodosList';
import {createSelector} from 'reselect';
import {toggleTodo, addTodo} from './../../actions';
import React from 'react';
import {InputButton} from '../../components/input-button/InputButton';
import {redirectToPath} from './../../redirect';


const FilterTodoList = (props) => {
    const {
        dispatch,
        params: {category},
    } = props;

    return (
        <div>
            <div className="input-button-wrapper">
                <InputButton
                    placeholder={'Enter task title'}
                    onButtonClick={(text) => text && dispatch(addTodo(text, category))}>
                    Add Task
                </InputButton>
            </div>
            <TodosList {...props}
                       onTodoToggled={(id) => dispatch(toggleTodo(id))}
                       onTodoEdit={(id) => redirectToPath(`/category/${category}/task/${id}`)}>
            </TodosList>
        </div>
    );
};

const filterTodosByCategory = (todos, category) => {
    return todos.filter(todo =>
        todo.category === category
    );
};

const getTodosByCategory = createSelector(
    state => state.todos.present,
    (state, props) => props.params.category,
    filterTodosByCategory
);

const todosFilter = (conditionToApplyFilter, filterCondition) => (todos, filter) => {
    if (conditionToApplyFilter(filter)) {
        return todos.filter(filterCondition);
    }

    return todos;
}

const filterByDoneSelector = createSelector(
    getTodosByCategory,
    (state, props) => props.location.query.showJustDone === 'true',
    todosFilter(showDone => showDone === true, t => t.completed)
);

const filterTextSelector = createSelector(
    filterByDoneSelector,
    (state, props) => props.location.query.filter,
    (todos, filterText) => todosFilter(f => f, t => t.text.includes(filterText))(todos, filterText)
);

const mapStateToProps = (state, props) => ({
    todos: filterTextSelector(state, props)
});


export default connect(
    mapStateToProps
)(FilterTodoList);