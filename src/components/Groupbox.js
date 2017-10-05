import React from 'react';
import {Subgroup} from './Subgroup';

// import './Groupbox.css';

export class Groupbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namesets: [],
    };
  }

  render() {
    const buildSubgroup = (subgroup, index) => {
      return (
        <Subgroup key={index} subgroup={subgroup}
          namesets={this.props.namesets.filter(nameset => nameset.attributes["subgroup-id"].toString() === subgroup.id)}
          handleCheckboxChange={this.props.handleCheckboxChange}
        />
      );
    }

    const subgroups = this.props.subgroups.map(buildSubgroup)

    return (
      <section className="group-box">
        <div className="group-box__header">{this.props.group.attributes.label}</div>
        <div className="group-box__body">
          {subgroups}
        </div>
      </section>

    )

  }

}
