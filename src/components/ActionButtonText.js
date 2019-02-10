import React from 'react';

import './ActionButtonText.css';

export function ActionButtonText(props) {

    const generateButtonText = () => {
	if (props.isLoading) {	    
	    return "Loading, please wait";
	}
	else if (props.isGenerating) {
	    return "Generating, please wait";
	}
	else if (props.howManyNamesetsSelected === 0) {
	    return "Select some nameset or namesets";
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
