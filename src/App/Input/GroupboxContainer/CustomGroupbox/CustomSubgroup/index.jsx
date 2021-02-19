import React from 'react';
import CustomNameset from './CustomNameset';

import './styles.css';

import PropTypes from 'prop-types';

export default function CustomSubgroup(props) {

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

CustomSubgroup.propTypes = {
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
