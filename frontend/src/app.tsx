import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from './routes/routes';

function render() {
  ReactDOM.render(
    <CssBaseline>
      <Router />
    </CssBaseline>
    , document.body);
}

render();