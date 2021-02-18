import React from 'react';

import Subgroup from './Subgroup';

import './styles.css';

import PropTypes from 'prop-types';

export default class Groupbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.group.attributes.label,
            id: this.props.group.id,
        };
    }

    render() {
        const buildSubgroup = (subgroup) => {
            return (
                <Subgroup
                  key={subgroup.id}
                  namesets={this.props.namesets[subgroup.id]}
                  afterToggleNamesetCheckbox={this.props.afterToggleNamesetCheckbox}
                />
            );
        };

        const subgroups = this.props.subgroups.map(buildSubgroup);

        return (
            <section className="group-box">
              <div className="group-box__header">{this.state.label}</div>
              <div className="group-box__body">
                {subgroups}
              </div>
            </section>
        );
    }
}

Groupbox.propTypes = {
    group: PropTypes.shape({
        attributes: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        links: PropTypes.object.isRequired,
        relationships: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    subgroups: PropTypes.arrayOf(PropTypes.object),
    namesets: PropTypes.object.isRequired,
    afterToggleNamesetCheckbox: PropTypes.func.isRequired
};
