import React from 'react';

import {GeneratedHeader} from './GeneratedHeader';
import {GeneratedItems} from './GeneratedItems';

import './GeneratedList.css';

export class GeneratedList extends React.Component {

    render() {
        return (
            <div>
              <h2 className="subsection-header">Generated names</h2>
              <GeneratedHeader
	        sortingButtons={this.props.sortingButtons}
	        pathToLastSortMethod={this.props.pathToLastSortMethod}
	      />
              <GeneratedItems items={this.props.sorted}/>
            </div>
        );
    }
}
