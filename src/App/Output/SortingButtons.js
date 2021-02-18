import React from 'react';

import RadioButton from './RadioButton';

import './SortingButtons.css';

import PropTypes from 'prop-types';

export default class SortingButtons extends React.Component {

    constructor(props) {
	super(props);
	this.handleRadio = this.handleRadio.bind(this);
    }

    handleRadio(e) {
	const selectedOptionIndex = parseInt(e.target.dataset.buttonNumber, 10);
	this.props.afterChoosingSorting(selectedOptionIndex);
    }

    render() {
	const buildOption = (option, index) => {
	    return (
		<RadioButton
                  key={index}
                  name="sortings"
                  buttonNumber={index}
                  label={option.label}
                  description={""}
                  onChange={this.handleRadio}
                  checked={this.props.selectedOption === index}
                  alt={option.alt}
                  icon={option.icon}
		/>
	    );
	};

	const options = this.props.sortingOptions.map(buildOption);
	return (
	    <section className="sorting">
              <h2 className="sorting__header">Sorting methods</h2>
              <div className="sorting__options">
		{options}
              </div>
	    </section>
	);
    }
}

SortingButtons.propTypes = {
    generated: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.number.isRequired,
    sortingOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    afterChoosingSorting: PropTypes.func.isRequired
};
