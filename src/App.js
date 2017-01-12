import React from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tree} from './components/tree/Tree';
import Node from './containers/tree/Node';
import MoveToNode from './containers/tree/MoveToNode';
import {InputButton} from './components/input-button/input-button';
import {connect} from 'react-redux';
import {createCategory} from './actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {createSelector} from 'reselect';

const App = ({dispatch, categories, children, currentCategory, task}) => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
            <AppBar
                title="Todo-Shmodo"
            />
            <InputButton onButtonClick={(text) => dispatch(createCategory(text))}>Add Category</InputButton>
            <div className="container">
                <div className="sidetree-container">
                    <Tree component={task ? MoveToNode : Node}
                          currentTask={task}
                          currentCategory={currentCategory} data={categories}></Tree>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    </MuiThemeProvider>
);

const getCategoriesTreeorized = createSelector(
    state => state.categories,
    treeorizeCategories
);

function treeorizeCategories({present: categories}) {
    const map = categories
        .reduce((res, category) => {
            const copy = {...category};
            copy.children = [];
            return Object.assign(res, {[category.id]: copy})
        }, {});

    const result = [];

    categories.forEach(category => {
        if (category.parent) {
            const parent = map[category.parent];
            parent.children.push(map[category.id]);
        } else {
            result.push(map[category.id]);
        }
    });

    return {children: result, text: '', id: ''};
};

const mapStateToProps = (state, props) => ({
    categories: getCategoriesTreeorized(state),
    currentCategory: props.params.category,
    task: props.params.task
});

export default connect(
    mapStateToProps
)(App);
