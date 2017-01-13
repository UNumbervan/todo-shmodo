import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {editTodo} from './../../actions';
import React from 'react';
import {Todo} from './../../components/todo/Todo';
import {redirectToPath} from './../../redirect';


const TodoContainer = (props) => {
    const {dispatch, todo, params: {category}} = props;

    return (
        <Todo todo={todo}
              onSave={(todo) => onSave(todo, dispatch)}
              onCancel={() => redirectToPath(`/category/${category}`)}/>
    );
};

function onSave({id, text, completed, description}, dispatch) {
    dispatch(editTodo(id, text, completed, description));
}

const getTodoById = id => todos => {
    return todos.find(todo =>
        todo.id === id
    );
};

const getTodo = id => createSelector(
    state => state.todos.present,
    getTodoById(id)
);

const mapStateToProps = (state, props) => ({
    todo: getTodo(props.params.task)(state)
});

export default connect(
    mapStateToProps
)(TodoContainer);