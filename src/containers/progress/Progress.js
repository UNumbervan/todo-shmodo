import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

class Progress extends React.Component {
    render() {
        return (
            <LinearProgress mode="determinate" value={this.props.progress}/>
        );
    }
}

const progressSelector = createSelector(
    state => state.categories.present,
    state => state.todos.present,
    (categories, todos) => {
        const notCompletedTasksByCategories = {};
        todos.forEach(t => {
            if (!t.completed) {
                notCompletedTasksByCategories[t.category] = true;
            }
        });

        return (1 - (Object.keys(notCompletedTasksByCategories).length / categories.length)) * 100;
    }
);

const mapStateToProps = (state) => ({
    progress: progressSelector(state)
});

export default connect(
    mapStateToProps
)(Progress);