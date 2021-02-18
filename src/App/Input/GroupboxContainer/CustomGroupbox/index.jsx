import React from 'react';
import CustomSubgroup from './CustomSubgroup';

import './styles.css';

import PropTypes from 'prop-types';

export default function CustomGroupbox(props) {

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

CustomGroupbox.propTypes = {
    namesetId: PropTypes.string.isRequired,
    defaultNameset: PropTypes.shape({
        filters: PropTypes.array,
        label: PropTypes.string.isRequired,
        names: PropTypes.array.isRequired,
        splitters: PropTypes.array,
        variantSeparator: PropTypes.string.isRequired,
    }).isRequired,
    afterToggleCustomNamesetCheckbox: PropTypes.func.isRequired,
    afterChangeCustomNamesetTextArea: PropTypes.func.isRequired
};
