import {Node} from './../../components/tree/Node';
import {createCategory, editCategory, deleteCategory} from './../../actions';
import {connect} from 'react-redux';
import React from 'react';
import {browserHistory} from 'react-router';

class NodeContainer extends React.Component {
    render() {
        const props = this.props;
        const selected = props.currentCategory === props.data.id;
        return (
            <Node {...props}
                  selected={selected}
                  onClick={() => browserHistory.push(`/category/${props.data.id}/`)}
                  onAddCategory={(text) => props.dispatch(createCategory(text, props.data.id))}
                  onEditCategory={(text) => props.dispatch(editCategory(props.data.id, text))}
                  onDeleteCategory={() => tryDeleteCategory(props.data, props.dispatch)}>
            </Node>
        );
    }
}


function tryDeleteCategory(category, dispatch) {
    //change default confirmation to custom popup
    if (confirm(`Are you sure you want to delete category ${category.text}`)) {
        deleteCategory(category, dispatch);
    }
}

export default connect()(NodeContainer);