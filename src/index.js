import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function render() {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
}

render();
