import undoable from 'redux-undo';
import {data} from './../test-tree-data';

const category = (state, {type, text, id, parent}) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return {
        parent,
        text,
        id
      };
    default:
      return state;
  }
};

const categories = (state = data, action) => {
  switch (action.type) {
    case 'CATEGORY_CREATE':
      return [
        ...state,
        category(undefined, action)
      ];
    case 'CATEGORY_DELETE':
      return state
          .filter(t => t.id !== action.id);
    default:
      return state;
  }
};

export default undoable(categories);
