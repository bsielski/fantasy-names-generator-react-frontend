import React from 'react';

import './styles.css';

import PropTypes from 'prop-types';

export default class Header extends React.Component {

    render() {
        return (
            <header className="l-header-container">
              <img src="logo.png" alt="site logo" className="logo-img"></img>
              <div className="l-brand-container">
      	        <h1 className="brand-title">Fantasy Names Generator (v {this.props.version})</h1>
                <p className="brand-description">It takes real names, analyse their patterns, and mixes them up to create new fictional fantasy names.</p>
              </div>
            </header>
        );
    }
}

Header.propTypes = {
    version: PropTypes.string.isRequired
};
