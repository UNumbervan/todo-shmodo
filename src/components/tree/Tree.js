export function Tree(props){
    const NodeComponent = props.component;

    const children = props.children && props.children.map((child) => {
            return <Tree data={child}></Tree>;
        });

    return <div className="node">
        <NodeComponent {...{data: props.data}}></NodeComponent>
    </div>;
}