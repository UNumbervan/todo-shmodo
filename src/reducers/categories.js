import undoable from 'redux-undo';

const category = (state, {type, text, id, parent}) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return {
        parent,
        text,
        id
      };
    case 'CATEGORY_EDIT':
      if (state.id !== id) {
        return state
      }

      return {
        ...state,
        text,
      };
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case 'CATEGORY_CREATE':
      return [
        category(undefined, action),
        ...state
      ];
    case 'CATEGORY_DELETE':
      return state
          .filter(t => !action.ids.includes(t.id));
    case 'CATEGORY_EDIT':
      return state.map(t =>
          category(t, action)
      );
    default:
      return state;
  }
};

export default undoable(categories);
