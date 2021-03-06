import React from 'react';

import './styles.css';

import PropTypes from 'prop-types';

export default class HowManyNames extends React.Component {

    constructor(props) {
	      super(props);
	      this.handleRadio = this.handleRadio.bind(this);
    }

    handleRadio(e) {
	      const selectedOption = parseInt(e.target.dataset.buttonNumber, 10);
	      const howManyNames = parseInt(e.target.value, 10);
	      this.props.afterChoosingHowManyNames(howManyNames, selectedOption);
    }

    render() {
        const RadioButton = this.props.RadioButton;
	      const buildOption = (option, index) => {
	          return (
		            <RadioButton key={index}
                             name="options"
                             buttonNumber={index}
                             value={option.value}
			                       label={option.label}
                             description={option.description}
			                       onChange={this.handleRadio}
                             checked={this.props.selectedOption === index}
		            />
	          );
	      };

	      const options = this.props.options.map(buildOption);
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

HowManyNames.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedOption: PropTypes.number.isRequired,
    afterChoosingHowManyNames: PropTypes.func.isRequired
};
