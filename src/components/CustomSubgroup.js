import React from 'react';
import {CustomNameset} from './CustomNameset';

import './CustomSubgroup.css';

export function CustomSubgroup(props) {

    return (
        <div className="group-box__column">
          <CustomNameset
            namesetId={props.namesetId}
            defaultNameset={props.defaultNameset}
            afterToggleCustomNamesetCheckbox={props.afterToggleCustomNamesetCheckbox}
            afterChangeCustomNamesetTextArea={props.afterChangeCustomNamesetTextArea}
          />
        </div>
    );
}
