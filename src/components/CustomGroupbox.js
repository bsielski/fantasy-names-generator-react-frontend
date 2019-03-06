import React from 'react';
import {CustomSubgroup} from './CustomSubgroup';

import './CustomGroupbox.css';

export function CustomGroupbox(props) {

    const fixCountingBug = (id) => (parseInt(id, 10) + 1).toString();

    return (
        <section className="group-box">
          <div className="group-box__header">Custom {fixCountingBug(props.namesetId)}</div>
          <div className="group-box__body">
            <CustomSubgroup
              namesetId={props.namesetId}
              defaultNameset={props.defaultNameset}
              afterToggleCustomNamesetCheckbox={props.afterToggleCustomNamesetCheckbox}
              afterChangeCustomNamesetTextArea={props.afterChangeCustomNamesetTextArea}
            />
          </div>
        </section>
    );
}
