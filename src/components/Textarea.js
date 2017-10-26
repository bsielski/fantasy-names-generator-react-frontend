import React from 'react';

import './Nameset.css';

export class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  componentWillMount() {
    const createDefaultValue = (namesetId, customNames) => {
      let resultText = "";
      console.log("KURWAAA: ", namesetId, customNames);
      if (customNames[namesetId]) {
        customNames[namesetId].forEach(name => {
          resultText += name.attributes.variants + " ";
        });
      }
      console.log("GODDAMNED TEXT ", resultText);
      return resultText;
    };
    const defaultValue = createDefaultValue(this.props.namesetId, this.props.customNames);
    console.log("GODDAMNED TEXT ", defaultValue);
    this.setState(
      {value: defaultValue}
    );

  }
  render() {


    return (
      <textarea
        name="textarea"
        className="custom_names__text_area"
        rows="10"
        defaultValue={this.state.value}
      >
      </textarea>
    )
  }

}
