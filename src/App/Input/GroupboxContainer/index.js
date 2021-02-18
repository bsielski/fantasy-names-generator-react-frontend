import React from 'react';
import {Groupbox} from './Groupbox';
import {CustomGroupbox} from './CustomGroupbox';

import './styles.css';

import PropTypes from 'prop-types';

class GroupboxContainer extends React.Component {
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
                  afterToggleNamesetCheckbox={this.props.afterToggleNamesetCheckbox}
                />
            );
        };
        const buildCustomGroupbox = (nameset, index) => {
            return (
                <CustomGroupbox
                  key={index}
                  namesetId={index.toString()}
                  defaultNameset={nameset}
                  afterToggleCustomNamesetCheckbox={this.props.afterToggleCustomNamesetCheckbox}
                  afterChangeCustomNamesetTextArea={this.props.afterChangeCustomNamesetTextArea}
                />
            );
        };

        const groupboxes = this.state.groups.map(buildGroupbox);
        const customGroupboxes = this.props.customNamesetsForGenerator.map(buildCustomGroupbox);

        return (
            <div>
              <h2 className="subsection-header">Pick a nameset or namestes</h2>
              <section className="group-container">
                {groupboxes}
                {customGroupboxes}
              </section>
            </div>
        );
    }
}

GroupboxContainer.propTypes = {
    afterToggleNamesetCheckbox: PropTypes.func.isRequired,
    afterToggleCustomNamesetCheckbox: PropTypes.func.isRequired,
    afterChangeCustomNamesetTextArea: PropTypes.func.isRequired,
    fetchGroupsSubgroupsNamesets: PropTypes.func.isRequired,
    customNamesetsForGenerator: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GroupboxContainer;
