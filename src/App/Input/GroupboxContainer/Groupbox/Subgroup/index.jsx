import React from 'react';
import Nameset from './Nameset';

import './styles.css';

import PropTypes from 'prop-types';

export default function Subgroup(props) {

    const buildNameset = (nameset, index) => {
        return (
            <Nameset
              API_SERVER={props.API_SERVER}
              key={index}
              nameset={nameset}
              afterToggleNamesetCheckbox={props.afterToggleNamesetCheckbox}
            />
        );
    };

    const namesets = props.namesets.map(buildNameset);

    return (
        <div className="group-box__column">
          {namesets}
        </div>
    );
}

Subgroup.propTypes = {
    namesets: PropTypes.arrayOf(
        PropTypes.shape({
            attributes: PropTypes.object.isRequired,
            id: PropTypes.string.isRequired,
            links: PropTypes.object.isRequired,
            relationships: PropTypes.object.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    afterToggleNamesetCheckbox: PropTypes.func.isRequired
};
