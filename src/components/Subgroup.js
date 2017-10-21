import React from 'react';
import {Nameset} from './Nameset';

// import './Groupbox.css';

export class Subgroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const buildNameset = (nameset, index) => {
      return (
        <Nameset
          key={index}
          nameset={nameset}
          handleCheckboxChange={this.props.handleCheckboxChange}
          custom={this.props.custom}
        />
      );
    }

    const namesets = this.props.namesets.map(buildNameset)

    return (
      <div className="group-box__column">
        {namesets}
      </div>
    )

  }

}
