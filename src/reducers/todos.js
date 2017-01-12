import undoable from 'redux-undo';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
        category: action.category,
        description: ''
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    case 'EDIT_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        category: state.category,
        id: action.id,
        completed: action.completed,
        text: action.text,
        description: action.description
      };
    case 'MOVE_TASK_TO_CATEGORY':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        category: action.category
      };
    default:
      return state
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
    case 'EDIT_TODO':
    case 'MOVE_TASK_TO_CATEGORY':
      return state.map(t =>
          todo(t, action)
      );
    case 'CATEGORY_DELETE':
      return state.filter(t => {
        return !(action.ids.includes(t.category));
      });
    default:
      return state
  }
};

const undoableTodos = undoable(todos);

export default undoableTodos;
