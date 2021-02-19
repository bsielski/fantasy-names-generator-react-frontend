import React from 'react';

import './ActionButtonText.css';

import PropTypes from 'prop-types';

export default function ActionButtonText(props) {

    const generateButtonText = () => {
	      if (props.isLoading) {
	          return "Loading, please wait";
	      }
	      else if (props.isGenerating) {
	          return "Generating, please wait";
	      }
	      else if (props.howManyNamesetsSelected === 0) {
	          return "Select some nameset or namesets!";
	      }
	      else {
	          return "Generate " + props.howManyNames + " names";
	      }
    };

    return (
	      <span className="action_button__button_text">
          {generateButtonText()}
	      </span>
    );
}

ActionButtonText.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isGenerating: PropTypes.bool.isRequired,
    howManyNamesetsSelected: PropTypes.number.isRequired,
    howManyNames: PropTypes.number.isRequired,
};
