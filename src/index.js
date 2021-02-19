import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {sortingOptions} from './sortingOptions';
import {numberOptions} from './numberOptions';
import {APP_VERSION} from './version';
import {API_SERVER} from './paths';
import {generate} from './generate';
import {fetchGroupsSubgroupsNamesets} from './fetchGroupsSubgroupsNamesets';
import {customNamesetsForGenerator} from './customNamesetsForGenerator';
import {sortNames} from "./sortNames";
import {optimizedSortNames} from "./optimizedSortNames";

ReactDOM.render(
    <App
      sortingOptions={sortingOptions}
      numberOptions={numberOptions}
      APP_VERSION={APP_VERSION}
      API_SERVER={API_SERVER}
      generate={generate}
      fetchGroupsSubgroupsNamesets={fetchGroupsSubgroupsNamesets}
      customNamesetsForGenerator={customNamesetsForGenerator}
      sortNames={sortNames}
      optimizedSortNames={optimizedSortNames}
    />,
    document.getElementById('root')
);
