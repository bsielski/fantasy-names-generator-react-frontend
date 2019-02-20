import React from 'react';
import {Nameset} from './Nameset';

import './Subgroup.css';

export function Subgroup(props) {

    const buildNameset = (nameset, index) => {
        return (
            <Nameset
              key={index}
              nameset={nameset}
              aftertToggleNamesetCheckbox={props.aftertToggleNamesetCheckbox}
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
