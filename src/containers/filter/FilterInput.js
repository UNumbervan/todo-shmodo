import React, {PropTypes} from 'react';
import {InputButton} from './../../components/input-button/input-button';
import {setQueryParams} from './../../redirect';
import is from 'is-type';

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

        const {showJustDone, filter} = substate;
        const showDone = is.boolean(showJustDone)
            ? showJustDone
            : this.state.showJustDone;

        const filterText = is.string(filter)
            ? filter
            : this.state.filter;

        setQueryParams({
            showJustDone: showDone || undefined,
            filter: filterText
        });
    }
}
