import React from 'react';

import {GeneratedHeader} from './GeneratedHeader';
import {SortButton} from './SortButton';
import {GeneratedItems} from './GeneratedItems';

// import './GeneratedContainer.css';

export class GeneratedList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      namesToDisplay: [],
      lastSortMethodUsed: "unsorted",
    };
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortByLength = this.sortByLength.bind(this);
    this.unsort = this.unsort.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      namesToDisplay: this.props.generated
    });
  }

  sortAlphabetically(isReversed) {
    const sorted = this.props.generated.slice();
    if (isReversed === false) {
      sorted.sort((a,b) => {
        if (a < b) return -1; else return 1
      });
      this.setState({
        lastSortMethodUsed: "alphabetically"
      });
    }
    else {
      sorted.sort((a,b) => {
        if (a > b) return -1; else return 1
      });
      this.setState({
        lastSortMethodUsed: "alphabetically-reversed"
      });
    }
    this.setState({
      namesToDisplay: sorted
    });
  }

  sortByLength(isReversed) {
    const sorted = this.props.generated.slice();
    if (isReversed === false) {
      sorted.sort((a,b) => {
        if (a.length < b.length) return -1; else return 1
      });
      this.setState({
        lastSortMethodUsed: "length"
      });
    }
    else {
      sorted.sort((a,b) => {
        if (a.length > b.length) return -1; else return 1
      });
      this.setState({
        lastSortMethodUsed: "length-reversed"
      });
    }
    this.setState({
      namesToDisplay: sorted
    });
  }

  unsort(isReversed) {
    const sorted = this.props.generated.slice();
    if (isReversed === true) {
      sorted.reverse();
      this.setState({
        lastSortMethodUsed: "unsorted-reversed"
      });
    }
    else {
      this.setState({
        lastSortMethodUsed: "unsorted"
      });
    }
    this.setState({
      namesToDisplay: sorted
    });
  }

  render() {
    // let names
    // if (this.state.namesToDisplay === []) {
    //   names = <GeneratedItems items={this.props.generated}/>;
    // }
    // else {
    //   names = <GeneratedItems items={this.state.namesToDisplay}/>;
    // }

    return (
      <div>
        <GeneratedHeader method={this.state.lastSortMethodUsed}/>
        <div className="sort-buttons">
          <SortButton label="Unsorted"
            alt="from first to last generated"
            altReversed="from last to first generated"
            icon="002-sort-by-numeric-order.svg"
            iconReversed="001-sort-by-order.svg"
            sort={this.unsort}
          />
          <SortButton label="Alphabetically"
            alt="from A to Z"
            altReversed="from Z to A"
            icon="006-sort-by-alphabet.svg"
            iconReversed="003-sort-reverse-alphabetical-order.svg"
            sort={this.sortAlphabetically}
          />
          <SortButton label="By name length"
            alt="from shortest to longest"
            altReversed="from longest to shortest"
            icon="005-sort-by-attributes-interface-button-option.svg"
            iconReversed="004-sort-by-attributes.svg"
            sort={this.sortByLength}
          />
        </div>
        <GeneratedItems items={this.state.namesToDisplay}/>
      </div>
    );

  }

}
