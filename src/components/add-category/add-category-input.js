import React, { PropTypes } from 'react'

export const AddCategoryInput = ({onAdd}) => {
    let input;

    return (
        <span>
            <input ref={node => input = node}/>
            <button onClick={() => input.value && onAdd(input.value)}>
                Add
            </button>
        </span>
    );
};

AddCategoryInput.propTypes = {
    onAdd: PropTypes.func.isRequired
};
