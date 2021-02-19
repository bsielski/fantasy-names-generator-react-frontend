import React from 'react';

import './CustomNamesArea.css';

import PropTypes from 'prop-types';

export default function CustomNamesArea(props) {

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

CustomNamesArea.propTypes = {
    namesetId: PropTypes.string.isRequired,
    variantSeparator: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    afterChangeTextArea: PropTypes.func.isRequired,
};
