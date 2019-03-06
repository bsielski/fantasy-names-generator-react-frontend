import React from 'react';

import './GeneratedHeader.css';

import PropTypes from 'prop-types';

export class GeneratedHeader extends React.Component {
    render() {
	const option = this.props.sortingOptions[this.props.selectedSortingOption];
	const label = option.label;
	const alt = option.alt;
	const icon = option.icon;
	return (
	    <p className="subsection-header">
	      <span className="current_sort_method">
		{label}
		<img className="sort_icon" alt={alt} src={icon} width="18" height="18"/>
	      </span>
	    </p>
	);
    }
}

GeneratedHeader.propTypes = {
    selectedSortingOption: PropTypes.number.isRequired,
    sortingOptions: PropTypes.arrayOf(PropTypes.object).isRequired
};
