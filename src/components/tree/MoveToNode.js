import React, {PropTypes} from 'react';
import {InputButton} from '../input-button/InputButton';

const nodePropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onMoveToCategory: PropTypes.func
});

nodePropTypes.children = PropTypes.arrayOf(nodePropTypes);

export class MoveToNode extends React.Component {
    static propTypes = {data: nodePropTypes};


    render() {
        return (
            <div className={`text-node ${this.getClass()}`}>
                <span>{this.props.data.text}</span>
                <button onClick={this.onMove.bind(this)}>Move inside</button>
            </div>
        );
    }

    getClass() {
        return this.props.selected ? 'selected' : '';
    }

    getActionCategoryInput(text, action) {
        return (
            <div className="add-subcategory-input">
                <InputButton onButtonClick={action}>{text}</InputButton>
            </div>
        );
    }

    onMove(event) {
        event && event.stopPropagation();
        this.props.onMoveToCategory();
    }
}

