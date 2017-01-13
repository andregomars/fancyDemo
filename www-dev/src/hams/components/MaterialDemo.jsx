import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

 
const MyAwesomeReactComponent = () => (
  <RaisedButton label="Click Me!" />
);

const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('container')
);