import React, { PropTypes } from 'react'

export const InputButton = ({onButtonClick, initialText, children}) => {
    let input;

    return (
        <span>
            <input ref={node => input = node}/>
            <button onClick={() => input.value && onButtonClick(input.value)}>
                {children}
            </button>
        </span>
    );
};

InputButton.propTypes = {
    onButtonClick: PropTypes.func.isRequired
};
