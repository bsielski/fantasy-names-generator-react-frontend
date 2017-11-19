import React from 'react';
import {RadioButton} from './RadioButton';

import './RadioGroup.css';

export class RadioGroup extends React.Component {

  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleRadio(e) {
    this.props.setHowManyNames(parseInt(e.target.dataset.buttonNumber, 10));
  }

  render() {
    const buildOption = (option, index) => {
      return (
        <RadioButton key={index} name="options" buttonNumber={index} value={option.value}
          label={option.label} description={option.description}
          onChange={this.handleRadio} checked={this.props.selectedOption === index}
        />
      );
    }

    const options = this.props.options.map(buildOption);
    return (
      <div>
        <h2 className="subsection-header">How many names do you want to generate?</h2>
        <div className="how-many-names">
          {options}
        </div>
      </div>
    )
  }

}
