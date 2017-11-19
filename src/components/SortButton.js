import React from 'react';

import './SortButton.css';

export class SortButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReverse: this._isReversedAtStart(),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  _isReversedAtStart() {
    if (this.props.startReversed) {
      return true;
    }
    else {
      return false;
    }
  }

  handleClick(e) {
    this.props.sort(this.state.isReverse);
    this.setState(prevState => {
      return { isReverse: !prevState.isReverse };
    });
  }

  render() {
    let alt = this.props.alt;
    if (this.state.isReverse === true) {
      alt = this.props.altReversed;
    }
    let icon = this.props.icon;
    if (this.state.isReverse === true) {
      icon = this.props.iconReversed;
    }
    return (
      <button onClick={this.handleClick} type="button" className="sort-button">
        {this.props.label}<img className="sort_icon" alt={alt} src={icon} width="15" height="15"/>
      </button>
    );
  }
}
