import React from 'react';

import './ActionButton.css';

export function ActionButton(props) {
  let text;
  if (props.howManyNamesetsSelected === 0) {
    text = "Select some nameset or namesets"
  }
  else {
    text = "Generate " + props.howManyNames + " names"
  }
  return (
    <div>
      <h2 className="subsection-header">Generate names</h2>
  	  <button type="button" id="generate-button" className="generate-button">{text}</button>
    </div>
  );
}
