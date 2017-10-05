import React from 'react';
import {Groupbox} from './Groupbox';

import './GroupboxContainer.css';

export class GroupboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const buildGroupbox = (group, index) => {

      return (
        <Groupbox key={index} group={group}
          subgroups={this.props.subgroups.filter(subgroup => subgroup.attributes["group-id"].toString() === group.id)}
          namesets={this.props.namesets} handleCheckboxChange={this.props.handleCheckboxChange} 
        />
      );
    }

    const groupboxes = this.props.groups.map(buildGroupbox)

    return (
      <div>
        <h2 className="subsection-header">Pick a nameset or namestes</h2>
        <section className="group-container">
          {groupboxes}
        </section>
      </div>
    )

  }

}
