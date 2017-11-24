import React from 'react';
import {Subgroup} from './Subgroup';

import './Groupbox.css';

export class Groupbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.group.attributes.label,
      id: this.props.group.id,
      custom: this.props.group.attributes.custom,
    };
  }

  render() {
    const buildSubgroup = (subgroup) => {
      return (
        <Subgroup
          key={subgroup.id}
          subgroup={subgroup}
          namesets={this.props.namesets[subgroup.id]}
          custom={this.state.custom}
          handleCheckboxChange={this.props.handleCheckboxChange}
          registerNameset={this.props.registerNameset}
        />
      );
    }

    const subgroups = this.props.subgroups.map(buildSubgroup)

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
