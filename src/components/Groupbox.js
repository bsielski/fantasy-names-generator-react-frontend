import React from 'react';
import {Subgroup} from './Subgroup';

// import './Groupbox.css';

export class Groupbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.group.attributes.label,
      id: this.props.group.id,
      custom: this.props.group.attributes.custom,
      subgroups: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/subgroups?filter[group-id]=' + this.state.id)
    .then(response => {
      // console.log("RESPONSE for subgroups?filter[group-id]=': ", response);
      return response.json();
    })
    .then(response => {
      // console.log("RESPONSEEEEEE: ", response.data);
      this.setState(
        {subgroups: response.data},
      );
      // console.log("IDS: ", ids);
    })
    .catch(error => console.log(error));
  }

  render() {
    const buildSubgroup = (subgroup) => {
      return (
        <Subgroup
          key={subgroup.id}
          subgroup={subgroup}
          custom={this.state.custom}
          handleCheckboxChange={this.props.handleCheckboxChange}
          registerNameset={this.props.registerNameset}
        />
      );
    }

    const subgroups = this.state.subgroups.map(buildSubgroup)

    return (
      <section className="group-box">
        <div className="group-box__header">{this.state.label}</div>
        <div className="group-box__body">
          {subgroups}
        </div>
      </section>

    )

  }

}
