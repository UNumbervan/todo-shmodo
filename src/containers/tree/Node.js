import {Node} from './../../components/tree/Node';
import {createCategory} from './../../actions';
import {connect} from 'react-redux';
import React from 'react';
import { browserHistory } from 'react-router';

const NodeContainer = (props) => {
    return (
        <Node {...props}
              selected={props.currentCategory === props.data.id}
              onClick={() => browserHistory.push(`/category/${props.data.id}`)}
              onAddCategory={(text) => props.dispatch(createCategory(text, props.data.id))}>
        </Node>
    );
};

export default connect()(NodeContainer);