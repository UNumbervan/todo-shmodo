import React, {PropTypes} from 'react';
import is from 'is-type';

export function Tree({data, component: Component, currentCategory, currentTask}) {
    const dataChildren = is.array(data) ? data : data.children;
    const children = dataChildren.map((child) => {
        return <Tree
            currentCategory={currentCategory}
            currentTask={currentTask}
            data={child}
            key={child.id}
            component={Component}>
        </Tree>;
    });


    return (
        //TODO Passing task to Tree seems strange to but did not find another way except this
        // and saving currently selected task into store (do not like this option)
        <div className="node">
            {is.array(data)
                ? children :
                (
                    <div>
                        <Component data={data}
                                   currentCategory={currentCategory}
                                   currentTask={currentTask}>
                        </Component>
                        <div className="children-container">
                            {children}
                        </div>
                    </div>
                )
            }

        </div>
    );
};

const nodePropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
})

Tree.propTypes = {
    data: React.PropTypes.oneOfType([
        nodePropTypes,
        PropTypes.arrayOf(nodePropTypes)
    ]),
    component: PropTypes.func
};