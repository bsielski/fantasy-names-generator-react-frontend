import React from 'react';

import './Nameset.css';

export class CustomNamesArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: "",
    };
  }


  componentDidMount() {
    if (this.props.custom === true) {
      fetch('http://localhost:3001/api/v1/names?filter[nameset-id]=' + this.props.namesetId)
      .then(response => {
        // console.log("RESPONSE for names?filter[nameset-id]=': ", response);
        return response.json();
      })
      .then(response => {
        console.log("RESPONSE.DATA NAMES: ", response.data);
        console.log("RESPONSE.DATA NAMES: ", response.data.map(name => name.attributes.variants).toString());

        this.setState(
          {names: response.data.map(name => name.attributes.variants).toString()},
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
          >
          </textarea>
        )
    }
    else {
      return null;
    }
  }

}
