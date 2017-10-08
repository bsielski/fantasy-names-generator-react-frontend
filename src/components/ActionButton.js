import React from 'react';

import './ActionButton.css';

export function ActionButton(props) {

  const isDisabled = () => {
    if (props.isGenerating) {
      return true;
    }
    else if (props.howManyNamesetsSelected === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  const generateButtonText = () => {
    if (props.isGenerating) {
      return "Generating, please wait"
    }
    else if (props.howManyNamesetsSelected === 0) {
      return "Select some nameset or namesets"
    }
    else {
      return "Generate " + props.howManyNames + " names"
    }
  }

  return (
    <div>
      <h2 className="subsection-header">Generate names</h2>
  	  <button
        type="button"
        id="generate-button"
        className="generate-button"
        disabled={ isDisabled() }
        onClick={props.onClick}
      >
        {generateButtonText()}
      </button>
    </div>
  );
}
