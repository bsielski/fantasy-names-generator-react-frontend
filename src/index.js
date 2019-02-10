import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import './index.css';

import {sortingButtons} from './sorting-buttons';
import {numberOptions} from './numberOptions';
import {API_SERVER} from './paths';
import {APP_VERSION} from './version';
import {generate} from './generate';
import {fetchNamesets} from './fetchNamesets';

ReactDOM.render(
    <App
      sortingButtons={sortingButtons}
      numberOptions={numberOptions}
      API_SERVER={API_SERVER}
      APP_VERSION={APP_VERSION}
      generate={generate}
      fetchNamesets={fetchNamesets}
      />,
    document.getElementById('root')
)
