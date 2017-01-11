import React, {PropTypes} from 'react';
import {AddInput} from '../add-input/add-input';

const nodePropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onAddCategory: PropTypes.func
});

nodePropTypes.children = PropTypes.arrayOf(nodePropTypes);

export class Node extends React.Component {
    constructor() {
        super();
        this.state = {
            addCategoryInputVisible: false
        };
    }

    render() {
        const addCategoryInput = this.state.addCategoryInputVisible
            ? this.getAddCategoryInput()
            : '';

        return (
            <div className={`text-node ${this.getClass()}`} onClick={this.props.onClick}>
                <span>{this.props.data.text}</span>
                <div className="add-subcategory-wrapper">
                    <button onClick={this.toggleAddCategoryInput.bind(this)}>+</button>
                    {addCategoryInput}
                </div>
            </div>
        );
    }

    getClass() {
        return this.props.selected ? 'selected' : '';
    }

    getAddCategoryInput() {
        return (
            <div className="add-subcategory-input">
                <AddInput onAdd={this.onAdd.bind(this)}></AddInput>
            </div>
        );
    }

    onAdd(text) {
        this.props.onAddCategory(text);
        this.toggleAddCategoryInput();
    }

    toggleAddCategoryInput(event) {
        event.stopPropagation();
        this.setState({addCategoryInputVisible: !this.state.addCategoryInputVisible});
    }

    static propTypes = {data: nodePropTypes};
}

