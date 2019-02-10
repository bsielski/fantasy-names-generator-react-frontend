import React from 'react';
import {Nameset} from './Nameset';

import './Subgroup.css';

export class Subgroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buildNameset = (nameset, index) => {
            return (
                <Nameset
                  key={index}
                  nameset={nameset}
                  aftertToggleNamesetCheckbox={this.props.aftertToggleNamesetCheckbox}
                  custom={this.props.custom}
                  registerNameset={this.props.registerNameset}
                />
            );
        };

        const namesets = this.props.namesets.map(buildNameset);

        return (
            <div className="group-box__column">
              {namesets}
            </div>
        );
    }
}
