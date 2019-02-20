import React from 'react';

import './CustomNamesArea.css';

export function CustomNamesArea(props) {

    return (
        <textarea
          name="textarea"
          className="custom_names__text_area"
          rows="10"
          value={props.text}
          onChange={props.afterChangeTextArea}
        >
        </textarea>
    );
}
