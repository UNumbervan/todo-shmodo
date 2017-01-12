import {connect} from 'react-redux';
import {TodosList} from './../../components/todos/TodosList';
import {createSelector} from 'reselect';
import {toggleTodo, addTodo} from './../../actions';
import React from 'react';
import {InputButton} from '../../components/input-button/input-button';
import {browserHistory} from 'react-router';


const FilterTodoList = (props) => {
    const {dispatch, params: {category}} = props;

    return (
        <div>
            <div className="input-button-wrapper">
                <InputButton onButtonClick={(text) => dispatch(addTodo(text, category))}>Add Task</InputButton>
            </div>
            <TodosList {...props}
                       onTodoToggled={(id) => dispatch(toggleTodo(id))}
                       onTodoEdit={(id) => browserHistory.push(`/category/${category}/task/${id}`)}>
            </TodosList>
        </div>
    );
};

const filterTodosByCategory = category => todos => {
    return todos.filter(todo =>
        todo.category === category
    );
};

const getTodosByCategory = category => createSelector(
    state => state.todos.present,
    filterTodosByCategory(category)
);

const mapStateToProps = (state, props) => ({
    todos: getTodosByCategory(props.params.category)(state)
});

export default connect(
    mapStateToProps
)(FilterTodoList);