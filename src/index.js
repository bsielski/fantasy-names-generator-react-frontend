import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import './index.css';

import {sortingButtons} from './sorting-buttons';


ReactDOM.render(
    <App
      sortingButtons={sortingButtons}
      />,
    document.getElementById('root')
)
