import React from 'react';
import {RadioButton} from './RadioButton';

import './SortingButtons.css';

export class SortingButtons extends React.Component {

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
		<RadioButton key={index} name="sortings" buttonNumber={index}
			     label={option.label} description={""}
			     onChange={this.handleRadio} checked={this.props.selectedOption === index}
                             alt={option.alt} icon={option.icon}
		/>
	    );
	};

	const options = this.props.sortingOptions.map(buildOption);
	return (
	    <section className="how_many_names">
              <h2 className="how_many_names__header">How many names do you want to generate?</h2>
              <div className="how_many_names__options">
		{options}
              </div>
	    </section>
	);
    }
}
