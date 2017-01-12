import React, {PropTypes} from 'react';

export function Tree({data, component: Component, currentCategory, currentTask}) {
    const children = data.children && data.children.map((child) => {
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
            <Component data={data}
                       currentCategory={currentCategory}
                       currentTask={currentTask}>
            </Component>
            <div className="children-container">
                {children}
            </div>
        </div>
    );
};

Tree.propTypes = {
    data: PropTypes.object,
    component: PropTypes.func
};