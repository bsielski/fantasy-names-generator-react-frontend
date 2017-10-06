import React from 'react';
import {RadioButton} from './RadioButton';

export class RadioGroup extends React.Component {
  // this.props.options = [
  //   {value: 10, label: '10', description: "(I feel very lucky).",},
  //   {value: 100, label: '100', description: "",},
  //   {value: 500, label: '500', description: "",},
  //   {value: 10000, label: '10000', description: "",},
  // ];
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
          {/* <DebugLabel picked={this.props.options[this.state.checkedOption].label} /> */}
          {options}
        </div>
      </div>
    )
  }

}

// function DebugLabel(props) {
//   return (
//     <p className="lead">
//       <strong>{props.picked}</strong>
//       {props.picked ? ', nice pick!' : 'Tap away, friend.'}
//     </p>
//   );
// }
