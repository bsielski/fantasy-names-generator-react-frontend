import React from 'react';
import {SortButton} from './SortButton';

import './Sorting.css';

export class Sorting extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="sorting">
        <h2 className="subsection-header">Sorting methods</h2>
        <div className="sort-buttons">
          <SortButton label="Unsorted"
            alt="from first to last generated"
            altReversed="from last to first generated"
            icon="002-sort-by-numeric-order.svg"
            iconReversed="001-sort-by-order.svg"
            sort={this.props.unsort}
            startReversed={true}
            names={this.props.generated}
          />
          <SortButton label="Alphabetically"
            alt="from A to Z"
            altReversed="from Z to A"
            icon="006-sort-by-alphabet.svg"
            iconReversed="003-sort-reverse-alphabetical-order.svg"
            sort={this.props.sortAlphabetically}
            names={this.props.generated}
          />
          <SortButton label="By name length"
            alt="from shortest to longest"
            altReversed="from longest to shortest"
            icon="005-sort-by-attributes-interface-button-option.svg"
            iconReversed="004-sort-by-attributes.svg"
            sort={this.props.sortByLength}
            names={this.props.generated}
          />
        </div>
      </section>
    )
  }

}
