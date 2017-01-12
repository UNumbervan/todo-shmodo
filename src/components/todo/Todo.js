import React, {PropTypes} from 'react';

export class Todo extends React.Component {
    componentWillMount() {
        this.state = {
            ...this.props.todo
        };
    }

    render() {
        return (
            <div className="todo-details-wrapper">
                <div>
                    <button onClick={this.props.onCancel}>Cancel</button>
                    <button onClick={this.onSave.bind(this)}
                            disabled={!this.state.text}>
                        Save
                    </button>
                </div>
                <input value={this.state.text}
                       onChange={this.onNameChanged.bind(this)}>
                </input>
                <br/>
                <div>
                    <label>
                        <input type="checkbox"
                               checked={this.state.completed}
                               onChange={this.onCompletedChanged.bind(this)}>
                        </input>
                        Completed
                    </label>
                </div>
                <br/>
                <textarea value={this.state.description}
                          onChange={this.onDescriptionChanged.bind(this)}>
                </textarea>
            </div>
        );
    }

    onNameChanged(event) {
        this.setState({
            text: event.target.value
        });
    }

    onCompletedChanged(event) {
        this.setState({
            completed: event.target.checked
        });
    }

    onDescriptionChanged(event) {
        this.setState({
            description: event.target.value
        });
    }

    onSave() {
        this.props.onSave({...this.state});
    }

    static propTypes = {
        todo: PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }),
        onCancel: PropTypes.func,
        onSave: PropTypes.func
    }
}