import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import './index.css';

import {sortingButtons} from './sorting-buttons';
import {numberOptions} from './numberOptions';
import {APP_VERSION} from './version';
import {generate} from './generate';
import {fetchGroupsSubgroupsNamesets} from './fetchGroupsSubgroupsNamesets';

ReactDOM.render(
    <App
      sortingButtons={sortingButtons}
      numberOptions={numberOptions}
      APP_VERSION={APP_VERSION}
      generate={generate}
      fetchGroupsSubgroupsNamesets={fetchGroupsSubgroupsNamesets}
      />,
    document.getElementById('root')
)
