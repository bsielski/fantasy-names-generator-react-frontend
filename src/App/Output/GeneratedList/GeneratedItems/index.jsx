import React from 'react';

import './styles.css';

import PropTypes from 'prop-types';

export default class GeneratedItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const items = this.props.items.map( (name, index) => {
            return (
                <li key={index}>{name}</li>
            );
        });

        return (
            <div>
              <ol className="list-of-generated" id="list-of-generated">
                {items}
              </ol>
            </div>
        );
    }
}

GeneratedItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired
};
