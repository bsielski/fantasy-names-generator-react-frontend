import React from 'react';
import {Nameset} from './Nameset';
import {API_SERVER} from '../paths';

// import './Groupbox.css';

export class Subgroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.subgroup.id,
      custom: this.props.custom,
      namesets: [],
    };
  }

  componentDidMount() {
    fetch('http://' + API_SERVER + ':3001/api/v1/namesets?filter[subgroup-id]=' + this.state.id)
    .then(response => {
      // console.log("RESPONSE for subgroups?filter[group-id]=': ", response);
      return response.json();
    })
    .then(response => {
      // console.log("RESPONSEEEEEE: ", response.data);
      this.setState(
        {namesets: response.data},
      );
      // console.log("IDS: ", ids);
    })
    .catch(error => console.log(error));
  }


  render() {
    const buildNameset = (nameset, index) => {
      return (
        <Nameset
          key={index}
          nameset={nameset}
          handleCheckboxChange={this.props.handleCheckboxChange}
          custom={this.props.custom}
          registerNameset={this.props.registerNameset}
        />
      );
    }

    const namesets = this.state.namesets.map(buildNameset)

    return (
      <div className="group-box__column">
        {namesets}
      </div>
    )

  }

}
