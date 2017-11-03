import React from 'react';
import {Groupbox} from './Groupbox';

import './GroupboxContainer.css';

export class GroupboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }


  componentDidMount() {

    fetch('http://localhost:3001/api/v1/groups')
    .then(response => {
      // console.log("RESPONSE for groups: ", response);
      return response.json();
    })
    .then(response => {
      // console.log("RESPONSEEEEEE: ", response.data);
      this.setState(
        {groups: response.data},
      );
    })
    .catch(error => console.log(error));
  }


  render() {

    const buildGroupbox = (group) => {
      return (
        <Groupbox
          key={group.id}
          group={group}
          handleCheckboxChange={this.props.handleCheckboxChange}
          registerNameset={this.props.registerNameset}
        />
      );
    }

    const groupboxes = this.state.groups.map(buildGroupbox)

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
