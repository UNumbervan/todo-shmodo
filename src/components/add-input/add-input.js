import React, { PropTypes } from 'react'

export const AddInput = ({onAdd}) => {
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

AddInput.propTypes = {
    onAdd: PropTypes.func.isRequired
};
