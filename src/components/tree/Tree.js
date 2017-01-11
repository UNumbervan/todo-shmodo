import React, {PropTypes} from 'react';

export function Tree({data, component: Component}) {
    const children = data.children && data.children.map((child) => {
            return <Tree data={child} key={child.id} component={Component}></Tree>;
        });


    return (
        <div className="node">
            <Component data={data}></Component>
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