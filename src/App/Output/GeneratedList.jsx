import React from 'react';

import GeneratedHeader from './GeneratedHeader';
import GeneratedItems from './GeneratedItems';

import './GeneratedList.css';

import PropTypes from 'prop-types';

export default class GeneratedList extends React.Component {

    render() {
        return (
            <div>
              <h2 className="subsection-header">Generated names</h2>
              <GeneratedHeader
	        sortingOptions={this.props.sortingOptions}
	        selectedSortingOption={this.props.selectedSortingOption}
	      />
              <GeneratedItems items={this.props.sorted}/>
            </div>
        );
    }
}

GeneratedList.propTypes = {
    sorted: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSortingOption: PropTypes.number.isRequired,
    sortingOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    pathToLastSortMethod: PropTypes.array.isRequired
};
