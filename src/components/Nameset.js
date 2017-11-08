import React from 'react';
import {CustomNamesArea} from './CustomNamesArea';

import './Nameset.css';

export class Nameset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameset: this.props.nameset,
      custom: this.props.custom,
      isChecked: false,
      isDisable: true,
      // names: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // fetch('http://127.0.0.1:3001/api/v1/names?filter[nameset-id]=' + this.state.nameset.id)
    // .then(response => {
    //   // console.log("RESPONSE for names?filter[nameset-id]=': ", response);
    //   return response.json();
    // })
    // .then(response => {
    //   console.log("RESPONSE.DATA NAMES: ", response.data);
    //
    //   this.setState(
    //     {names: response.data},
    //   );
    //   // console.log("IDS: ", ids);
    // })
    // .catch(error => console.log(error));
  }

  componentDidUpdate() {
    // console.log("STATE NAMES: ", this.state.names);
  }


  handleChange() {
    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    this.props.handleCheckboxChange(this.props.nameset.id);
  }

  render() {
    const namesetId = "nameset-" + this.state.nameset.id

    const namesCount = () => {
      if (this.props.nameset.attributes["names-count"]) {
        return this.props.nameset.attributes["names-count"].toString();
      }
      else {
        return "0";
      }
    }

    return (
      <div>
        <div className="group-box__item">
          <input className="group-box__checkbox" id={namesetId} type="checkbox"
            onChange={this.handleChange} checked={this.state.isChecked}
          />
          <label className="group-box__label" htmlFor={namesetId}>{this.props.nameset.attributes.label}
            <span className="group-box__names_number">
              {" (" + namesCount() + ")"}
            </span>
          </label>
        </div>
        <CustomNamesArea
          // customNames={this.state.names}
          namesetId={this.state.nameset.id}
          custom={this.props.custom}
          separator={this.state.nameset.attributes.variant_separator}
          registerNameset={this.props.registerNameset}
        />
      </div>
    )

  }

}
