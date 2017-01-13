import {MoveToNode} from './../../components/tree/MoveToNode';
import {moveToCategory} from './../../actions';
import {connect} from 'react-redux';
import React from 'react';
import {redirectToPath} from './../../redirect';

class NodeContainer extends React.Component {
    render() {
        const props = this.props;
        const selected = props.currentCategory === props.data.id;
        const task = props.currentTask;

        return (
            <MoveToNode {...props}
                  selected={selected}
                  onMoveToCategory={() => onMove(props.data.id, task, props.dispatch)}>
            </MoveToNode>
        );
    }
}

function onMove(category, task, dispatch) {
    dispatch(moveToCategory(category, task));
    redirectToPath(`/category/${category}/task/${task}`);
}

export default connect()(NodeContainer);