import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';

import './index.css';

import {sortingOptions} from './sortingOptions';
import {numberOptions} from './numberOptions';
import {APP_VERSION} from './version';
import {generate} from './generate';
import {fetchGroupsSubgroupsNamesets} from './fetchGroupsSubgroupsNamesets';
import {customNamesetsForGenerator} from './customNamesetsForGenerator';
import {sortNames} from "./sortNames";

ReactDOM.render(
    <App
      sortingOptions={sortingOptions}
      numberOptions={numberOptions}
      APP_VERSION={APP_VERSION}
      generate={generate}
      fetchGroupsSubgroupsNamesets={fetchGroupsSubgroupsNamesets}
      customNamesetsForGenerator={customNamesetsForGenerator}
      sortNames={sortNames}
    />,
    document.getElementById('root')
);
