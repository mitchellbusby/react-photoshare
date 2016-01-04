import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

ReactDOM.render((
  <div>
    <Application />
  </div>),
  document.getElementById('root')
);
