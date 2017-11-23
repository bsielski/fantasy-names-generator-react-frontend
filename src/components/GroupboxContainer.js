import React from 'react';
import {Groupbox} from './Groupbox';
import {API_SERVER} from '../paths';

import './GroupboxContainer.css';

export class GroupboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      subgroups: [],
      namesets: [],
    };
  }


  componentDidMount() {

    fetch('http://' + API_SERVER + ':3001/api/v1/groups?include=subgroups.namesets')
    .then(response => {
      // console.log("RESPONSE for groups: ", response);
      return response.json();
    })
    .then(response => {
      // console.log("RESPONSEEEEEE: ", response.data);
      this.setState(
        {
          groups: response.data,
          subgroups: response.included.filter(e => {return (e["type"] === "subgroups")}),
          namesets: response.included.filter(e => {return (e["type"] === "namesets")}),
        },
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
          subgroups={this.state.subgroups.filter(e => {return (e["attributes"]["group-id"].toString() === group["id"])})}
          namesets={this.state.namesets}
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
