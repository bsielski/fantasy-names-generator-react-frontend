import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import './index.css';

import {sortingButtons} from './sorting-buttons';
import {numberOptions} from './numberOptions';


ReactDOM.render(
    <App
      sortingButtons={sortingButtons}
      numberOptions={numberOptions}
      />,
    document.getElementById('root')
)
