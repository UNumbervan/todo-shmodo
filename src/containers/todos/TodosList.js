import {connect} from 'react-redux';
import {TodosList} from './../../components/todos/TodosList';
import {createSelector} from 'reselect';
import {toggleTodo, addTodo} from './../../actions';
import React from 'react';
import {AddInput} from './../../components/add-input/add-input';


const FilterTodoList = (props) => {
    const {dispatch, params: {category}} = props;

    return (
        <div>
            <AddInput onAdd={(text) => dispatch(addTodo(text, category))}></AddInput>
            <TodosList {...props}
                       onTodoToggled={(id) => dispatch(toggleTodo(id))}>
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