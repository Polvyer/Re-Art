import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './fonts/fonts';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
