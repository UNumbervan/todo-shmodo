import {generateTextId} from './generate-text-id';

export const createCategory = (text, parent = null) => ({
  type: 'CATEGORY_CREATE',
  id: generateTextId(),
  text,
  parent
});

export const addTodo = (text, category) => ({
  type: 'ADD_TODO',
  id: generateTextId(),
  text,
  category
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});
