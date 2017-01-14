import {shallow} from 'enzyme';
import React from 'react';
import {InputButton} from './../../components/input-button/InputButton';

describe('FilterInput', () => {
    let sut;
    let filter;
    let showJustDone;
    let setQueryParams;

    beforeEach(() => {
        filter = 'some filter';
        showJustDone = true;
        setQueryParams = jest.fn();

        jest.mock('./../../redirect', () => ({
            setQueryParams
        }));

        const FilterInput = require('./FilterInput').default;
        sut = shallow(<FilterInput filter={filter} showJustDone={showJustDone}/>);
    });

    afterEach(() => {
        jest.resetModules();
    } );

    describe('rendering', () => {
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

            const props = inputButton.props();

            expect(props.placeholder).toBe('Search');
            expect(props.value).toBe(filter);
            expect(inputButton.childAt(0).text()).toBe('Clear');
        });
    });

    describe('setting state', () => {
        it('should set state from props', () => {
            expect(sut.state()).toEqual({
                showJustDone,
                filter
            });
        });
    });

    describe('change of "Show done" checkbox by user', () => {
        let onChangeCallback;

        beforeEach(() => {
            const checkbox = sut.childAt(0).childAt(0);
            onChangeCallback = checkbox.props().onChange;
        });

        it('should change inner state accordingly', () => {
            onChangeCallback({target: {checked: false}});
            expect(sut.state().showJustDone).toBe(false);

            onChangeCallback({target: {checked: true}});
            expect(sut.state().showJustDone).toBe(true);
        });

        it('should update showJustDone query params accordingly', () => {
            onChangeCallback({target: {checked: false}});
            onChangeCallback({target: {checked: false}});

            expect(setQueryParams).toBeCalledWith({
                showJustDone: undefined,
                filter
            });
        });
    });

    describe('filter input', () => {
        let onEnterCallback;
        let onClearCallback;

        beforeEach(() => {
            const checkbox = sut.childAt(1);
            onEnterCallback = checkbox.props().onEnter;
            onClearCallback = checkbox.props().onButtonClick;
        });

        describe('pressing Enter', () => {
            let text;

            beforeEach(() => {
                text = 'some new text';
                onEnterCallback(text);
            });

            it('should change inner state filter field accordingly', () => {
                expect(sut.state().filter).toBe(text);
            });

            it('should update filter query params accordingly', () => {
                expect(setQueryParams).toBeCalledWith({
                    showJustDone,
                    filter: text
                });
            });
        });

        describe('clicking Clear button', () => {
            beforeEach(() => {
                onClearCallback();
            });

            it('should clear filter state field', () => {
                expect(sut.state().filter).toBe('');
            });

            it('should remove filter params from query', () => {
                expect(setQueryParams).toBeCalledWith({
                    showJustDone,
                    filter: undefined
                });
            });
        });
    });
});