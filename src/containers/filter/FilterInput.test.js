import {shallow} from 'enzyme';
import FilterInput from './FilterInput';
import React from 'react';
import {InputButton} from './../../components/input-button/InputButton';

describe('FilterInput', () => {
    describe('rendering', () => {
        let sut;
        let filter;
        let showJustDone;

        beforeEach(() => {
            filter = 'some filter';
            showJustDone = true;
            sut = shallow(<FilterInput filter={filter} showJustDone={showJustDone}/>);
        });

        it('should display checkbox', () => {
            const label = sut.childAt(0);

            expect(label.type()).toBe('label');

            const checkbox = label.childAt(0);
            expect(checkbox.props().checked).toBe(showJustDone);
            expect(checkbox.type()).toBe('input');

            const checkboxText = label.childAt(1);

            expect(checkboxText.text()).toBe('Show done');
        });

        it('should display inputButton', () => {
            const inputButton = sut.childAt(1);

            expect(inputButton.is(InputButton)).toBe(true);

            const props = inputButton.props();

            expect(props.placeholder).toBe('Search');
            expect(props.value).toBe(filter);
            expect(inputButton.childAt(0).text()).toBe('Clear');
        });
    });
});