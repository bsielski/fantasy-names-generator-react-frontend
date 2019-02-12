import React from 'react';
import {Groupbox} from './Groupbox';

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
        this.props.fetchGroupsSubgroupsNamesets()
            .then(response => {
                this.setState(response);
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
                  aftertToggleNamesetCheckbox={this.props.aftertToggleNamesetCheckbox}
                  registerNameset={this.props.registerNameset}
                />
            );
        };

        const groupboxes = this.state.groups.map(buildGroupbox);

        return (
            <div>
              <h2 className="subsection-header">Pick a nameset or namestes</h2>
              <section className="group-container">
                {groupboxes}
              </section>
            </div>
        );
    }
}
