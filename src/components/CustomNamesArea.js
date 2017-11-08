import React from 'react';

import './Nameset.css';

export class CustomNamesArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  arrayToText(array) {
    let result = "";
    array.forEach(variant => {
      result += variant + "\n"
    });
    console.log("RESULT:", result);
    return result;
  }

  textToArray(text) {
    let result = text.split("\n");
    result = result.filter(v => v.trim() !== '');
    return result;
  }

  handleChange(event) {
    this.setState({names: event.target.value});
    this.props.registerNameset(this.props.namesetId, this.textToArray(event.target.value))
  }

  componentDidMount() {
    if (this.props.custom === true) {
      fetch('http://127.0.0.1:3001/api/v1/names?filter[nameset-id]=' + this.props.namesetId)
      .then(response => {
        // console.log("RESPONSE for names?filter[nameset-id]=': ", response);
        return response.json();
      })
      .then(response => {
        console.log("RESPONSE.DATA NAMES: ", response.data);
        console.log("RESPONSE.DATA NAMES: ", response.data.map(name => name.attributes.variants).toString());

        this.setState(
          {names:  this.arrayToText(response.data.map(name => name.attributes.variants))},
        );
        // console.log("IDS: ", ids);
      })
      .catch(error => console.log(error));
      // console.log("CUSTOM NAMES: ", this.props.customNames);
    }

  }

  render() {
    if (this.props.custom === true) {
      return (
        <textarea
          name="textarea"
          className="custom_names__text_area"
          rows="10"
          value={this.state.names}
          onChange={this.handleChange}
          >
          </textarea>
        )
    }
    else {
      return null;
    }
  }

}
