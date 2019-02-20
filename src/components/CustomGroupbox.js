import React from 'react';
import {CustomSubgroup} from './CustomSubgroup';

import './CustomGroupbox.css';

export function CustomGroupbox(props) {

    return (
        <section className="group-box">
          <div className="group-box__header">New Custom {props.id}</div>
          <div className="group-box__body">
            <CustomSubgroup
              namesetId={props.namesetId}
              defaultNameset={props.defaultNameset}
              aftertToggleCustomNamesetCheckbox={props.aftertToggleCustomNamesetCheckbox}
              aftertChangeCustomNamesetTextArea={props.aftertChangeCustomNamesetTextArea}
            />
          </div>
        </section>
    );
}
