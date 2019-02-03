import React from 'react';

import {GeneratedHeader} from './GeneratedHeader';
import {GeneratedItems} from './GeneratedItems';

import './GeneratedList.css';

export class GeneratedList extends React.Component {

  render() {
    return (
      <div>
        <h2 className="subsection-header">Generated names</h2>
        <GeneratedHeader method={this.props.lastSortMethodUsed}/>
        <GeneratedItems items={this.props.sorted}/>
      </div>
    );

  }

}
