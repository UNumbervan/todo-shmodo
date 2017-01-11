import React, {PropTypes} from 'react';

export function Node({data}) {
    return (
        <div className="text-node">
            <span>{data.text}</span>
        </div>
    );
};

const nodePropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
});

nodePropTypes.children = PropTypes.arrayOf(nodePropTypes);

Node.propTypes = {data: nodePropTypes};
