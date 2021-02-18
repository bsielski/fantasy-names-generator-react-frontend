import React from 'react';

import PropTypes from 'prop-types';

function Icon(props) {
  if (!props.icon) {
    return null;
  }

  return (
    <img className="sort_icon" alt={props.alt} src={props.icon} width="15" height="15"/>
  );
}

export default function RadioButton(props) {
    return (
        <div>
          <label>
            <input type="radio" name={props.name} value={props.value}
                   onChange={props.onChange} checked={props.checked} data-button-number={props.buttonNumber}/>
            {props.label + " " + props.description}
            <Icon icon={props.icon} alt={props.alt}/>
          </label>
        </div>
    );
}

RadioButton.propTypes = {
    name: PropTypes.string.isRequired,
    buttonNumber: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    alt: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.number
};
