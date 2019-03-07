import React from 'react';
import {Nameset} from './Nameset';

import './Subgroup.css';

import PropTypes from 'prop-types';

export function Subgroup(props) {

    const buildNameset = (nameset, index) => {
        return (
            <Nameset
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
    ),
    afterToggleNamesetCheckbox: PropTypes.func.isRequired
};
