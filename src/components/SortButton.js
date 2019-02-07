import React from 'react';

import './SortButton.css';

export class SortButton extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    subbutton: this.props.sortingButton.defaultSubbutton,
	};
	this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
	const sort = this.props.sortingButton[this.state.subbutton].sort;
	this.props.afterSorting(
	    sort(this.props.names),
	    [this.props.sortingButton.id, this.state.subbutton]
	);
	this.setState(prevState => {
	    return { subbutton: this._toggleSubbutton() };
	});
    };

    _toggleSubbutton() {
	if (this.state.subbutton === "ascending") {
	    return "descending";
	}
	else {
	    return "ascending";
	}
    }

    render() {
	const alt = this.props.sortingButton[this.state.subbutton].alt;
	const icon = this.props.sortingButton[this.state.subbutton].icon;
	const label = this.props.sortingButton.label;
	return (
	    <button onClick={this.handleClick} type="button" className="sort-button">
              {label}<img className="sort_icon" alt={alt} src={icon} width="15" height="15"/>
	    </button>
	);
    }
}
