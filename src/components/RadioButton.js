import React from 'react';

export function RadioButton(props) {
    return (
        <div>
          <label>
            <input type="radio" name={props.name} value={props.value}
                   onChange={props.onChange} checked={props.checked} data-button-number={props.buttonNumber}/>
            {props.label + " " + props.description}
          </label>
        </div>
    );
}
