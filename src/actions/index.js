import {generateTextId} from './generate-text-id';

export const createCategory = (text, parent = null) => ({
  type: 'CATEGORY_CREATE',
  id: generateTextId(),
  text,
  parent
});
