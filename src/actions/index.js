import {generateTextId} from './generate-text-id';

export const createCategory = (text, parent = null) => ({
    type: 'CATEGORY_CREATE',
    id: generateTextId(),
    text,
    parent
});

export const editCategory = (id, text) => ({
    type: 'CATEGORY_EDIT',
    id,
    text
});

export const deleteCategory = (categories, dispatch) => {
    categories = [].concat(categories);

    dispatch({
        type: 'CATEGORY_DELETE',
        ids: categories.map(cat => cat.id)
    });

    categories.forEach(category => deleteCategory(category.children, dispatch));
}

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

export const editTodo = (id, text, completed, description) => ({
    type: 'EDIT_TODO',
    id,
    text,
    completed,
    description
});

export const moveToCategory = (category, task) => ({
    type: 'MOVE_TASK_TO_CATEGORY',
    category,
    id: task
});