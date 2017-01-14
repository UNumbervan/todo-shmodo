import React, {PropTypes} from 'react'

export class InputButton extends React.Component {
    static propTypes = {
        value: PropTypes.string
    };

    componentWillMount() {
        this.state = {
            value: this.props.value || ''
        };
    }

    render() {
        const {children, placeholder = ''} = this.props;

        return (
            <span>
                <input
                    value={this.state.value}
                    placeholder={placeholder}
                    onKeyPress={this.onKeyDown.bind(this)}
                    onChange={this.onInputChange.bind(this)}>
                </input>
                <button onClick={this.onButtonClick.bind(this)}>
                    {children}
                </button>
            </span>
        );
    }

    onInputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    onKeyDown(event) {
        const isEnter = event.charCode === 13;

        if (isEnter) {
            const {
                onEnter = () => {
                }
            } = this.props;
            onEnter(this.state.value);
        }
    }

    onButtonClick() {
        this.props.onButtonClick(this.state.value);
    }
}

InputButton.propTypes = {
    onButtonClick: PropTypes.func.isRequired
};
