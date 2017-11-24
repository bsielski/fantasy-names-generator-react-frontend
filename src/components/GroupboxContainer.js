import React from 'react';
import {Groupbox} from './Groupbox';
import {API_SERVER} from '../paths';

import './GroupboxContainer.css';

export class GroupboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      subgroups: {},
      namesets: {},
    };
  }


  componentDidMount() {
    const segregatedByNested = (array, key1, key2) => {
      const sorted = {};
      array.forEach(element => {
        if( sorted[element[key1][key2]] === undefined ){
          sorted[element[key1][key2]] = [];
        }
       sorted[element[key1][key2]].push(element);
      });
      return sorted;
    };

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
          subgroups: segregatedByNested(response.included.filter(e => {return (e["type"] === "subgroups")}), "attributes", "group-id"),
          namesets: segregatedByNested(response.included.filter(e => {return (e["type"] === "namesets")}), "attributes", "subgroup-id"),
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
          subgroups={this.state.subgroups[group.id]}
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
