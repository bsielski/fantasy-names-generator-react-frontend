import React from 'react';

import './GeneratedHeader.css';

export class GeneratedHeader extends React.Component {
    render() {
	const buttonIndex = this.props.pathToLastSortMethod[0];
	const subbuttonName = this.props.pathToLastSortMethod[1];
	const button = this.props.sortingButtons[buttonIndex];
	const subbuton = button[subbuttonName];
	const label = button.label;
	const alt = subbuton.alt;
	const icon = subbuton.icon;
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
