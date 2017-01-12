import React, {PropTypes} from 'react';
import {InputButton} from '../input-button/input-button';

const nodePropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onAddCategory: PropTypes.func,
    onEditCategory: PropTypes.func,
    onDeleteCategory: PropTypes.func,
    onMoveToCategory: PropTypes.func
});

nodePropTypes.children = PropTypes.arrayOf(nodePropTypes);

export class Node extends React.Component {
    static propTypes = {data: nodePropTypes};

    constructor() {
        super();
        this.state = {
            //Todo create compone combining button and inputbutton to avoid duptication of hide,show logic
            addCategoryInputVisible: false,
            editCategoryInputVisible: false
        };
    }

    render() {
        const addCategoryInput = this.state.addCategoryInputVisible
            ? this.getActionCategoryInput('Add', this.onAdd.bind(this))
            : '';

        const editCategoryInput = this.state.editCategoryInputVisible
            ? this.getActionCategoryInput('Edit', this.onEdit.bind(this))
            : '';

        return (
            <div className={`text-node ${this.getClass()}`} onClick={this.props.onClick}>
                <span>{this.props.data.text}</span>
                <div className="action-subcategory-wrapper">
                    <button onClick={this.toggleAddCategoryInput.bind(this)}>+</button>
                    {addCategoryInput}
                </div>
                <div className="action-subcategory-wrapper">
                    <button onClick={this.toggleEditCategoryInput.bind(this)}>Edit</button>
                    {editCategoryInput}
                </div>
                <button onClick={this.onDelete.bind(this)}>Delete</button>
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

    onAdd(text) {
        this.props.onAddCategory(text);
        this.toggleAddCategoryInput();
    }

    onEdit(text) {
        this.props.onEditCategory(text);
        this.toggleEditCategoryInput();
    }

    onDelete(event) {
        event && event.stopPropagation();
        this.props.onDeleteCategory();
    }

    toggleAddCategoryInput(event) {
        //TODO investigate why event in undefined from time to time
        event && event.stopPropagation();
        this.setState({addCategoryInputVisible: !this.state.addCategoryInputVisible});
    }

    toggleEditCategoryInput(event) {
        //TODO investigate why event in undefined from time to time
        event && event.stopPropagation();
        this.setState({editCategoryInputVisible: !this.state.editCategoryInputVisible});
    }
}

