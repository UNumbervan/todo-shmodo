import React, {PropTypes} from 'react';

export const TodosList = ({todos, onTodoToggled, onTodoEdit}) => {
    const todosElems = todos.map(
        ({completed, text, id}) =>
            <div className="todo-item" key={id}>
                <input type="checkbox" value={completed} onChange={() => onTodoToggled(id)}></input>
                <span>{text}</span>
                <button onClick={() => onTodoEdit(id)}>Edit</button>
            </div>
    );

    return (
        <div className="todo-items-container">
            {todosElems}
        </div>
    );
};

const TodoShape = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired
});

TodosList.propTypes = {
    todos: PropTypes.arrayOf(TodoShape).isRequired,
    onTodoToggled: PropTypes.func,
    onTodoEdit: PropTypes.func
};
