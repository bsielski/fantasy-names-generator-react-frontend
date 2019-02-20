import React from 'react';
import {CustomNameset} from './CustomNameset';

import './CustomSubgroup.css';

export function CustomSubgroup(props) {

    return (
        <div className="group-box__column">
          <CustomNameset
            namesetId={props.namesetId}
            defaultNameset={props.defaultNameset}
            aftertToggleCustomNamesetCheckbox={props.aftertToggleCustomNamesetCheckbox}
            aftertChangeCustomNamesetTextArea={props.aftertChangeCustomNamesetTextArea}
          />
        </div>
    );
}
