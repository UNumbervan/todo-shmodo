import React, {Component} from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tree from 'components/tree/Tree';
import Node from 'components/tree/Node';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className="App">
                    <AppBar
                        title="Todo-Shmodo"
                    />
                    <div className="container">
                        <div className="sidetree-container">
                            <Tree component={Node} data={{text: 'as', children: [{}]}}></Tree>
                        </div>
                        <div className="body"></div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
