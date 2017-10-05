import React from 'react';

import './ActionButton.css';

export function ActionButton(props) {
  return (
    <div>
      <h2 className="subsection-header">Generate names</h2>
  	  <button type="button" id="generate-button" className="generate-button">{props.text}</button>
    </div>
  );
}
