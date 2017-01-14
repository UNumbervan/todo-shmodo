import React, {PropTypes} from 'react';
import {InputButton} from '../../components/input-button/InputButton';
import {setQueryParams} from './../../redirect';

export default class FilterInput extends React.Component {
    static propTypes = {
        showJustDone: PropTypes.bool,
        filter: PropTypes.string
    };

    componentWillMount() {
        this.state = {
            showJustDone: this.props.showJustDone || false,
            filter: this.props.filter
        };
    }

    render() {
        return (
            <span>
                <label>
                    <input type="checkbox"
                           checked={this.state.showJustDone}
                           onChange={this.onShowDoneChange.bind(this)}/>
                    Show done
                </label>
                <InputButton
                    value={this.state.filter}
                    placeholder={'Search'}
                    onEnter={this.onEnterInFilter.bind(this)}
                    onButtonClick={this.onClear.bind(this)}>
                    Clear
                </InputButton>
            </span>
        );
    }

    onShowDoneChange(event) {
        this.updateState({
            showJustDone: event.target.checked
        });
    }

    onEnterInFilter(text) {
        this.updateState({
            filter: text
        });
    }

    onClear() {
        this.onEnterInFilter('');
    }

    updateState(substate) {
        this.setState(substate);

        const {showJustDone = this.state.showJustDone, filter = this.state.filter} = substate;

        setQueryParams({
            showJustDone: showJustDone || undefined,
            filter: filter || undefined
        });
    }
}
