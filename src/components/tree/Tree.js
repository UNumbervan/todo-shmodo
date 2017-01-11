import React, {PropTypes} from 'react';

export function Tree({data, component: Component, currentCategory}) {
    const children = data.children && data.children.map((child) => {
            return <Tree
                currentCategory={currentCategory}
                data={child}
                key={child.id}
                component={Component}>
            </Tree>;
        });


    return (
        <div className="node">
            <Component data={data} currentCategory={currentCategory}></Component>
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