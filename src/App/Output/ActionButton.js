import React from 'react';

import ActionButtonText from './ActionButtonText';

import './ActionButton.css';

import PropTypes from 'prop-types';

export default function ActionButton(props) {

    const isDisabled = () => {
	if (props.isLoading) {
	    return true;
	}
	else if (props.isGenerating) {
	    return true;
	}
	else if (props.howManyNamesetsSelected === 0) {
	    return true;
	}
	else {
	    return false;
	}
    };

    const handleClick = (e) => {
	e.preventDefault();
	props.afterClickingGenerateButton();
    };

    return (
	<section className="action_button">
	  <h2 className="action_button__header">Generate names</h2>
  	  <button
            type="button"
            id="generate-button"
            className="action_button__button"
            disabled={ isDisabled() }
            onClick={handleClick}
          >
            <ActionButtonText
              isLoading={ props.isLoading }
              isGenerating={ props.isGenerating }
              howManyNamesetsSelected={ props.howManyNamesetsSelected }
              howManyNames={ props.howManyNames }
	    />
	  </button>
	</section>
    );
}

ActionButton.propTypes = {
    isGenerating: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    howManyNamesetsSelected: PropTypes.number.isRequired,
    howManyNames: PropTypes.number.isRequired,
    afterClickingGenerateButton: PropTypes.func.isRequired,
};
