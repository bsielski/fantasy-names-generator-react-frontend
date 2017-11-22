import React from 'react';

import {API_SERVER} from '../paths';

import './Namelist.css';

export class Namelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    };
    this.close = this.close.bind(this);
  }

  componentDidMount() {

    fetch('http://' + API_SERVER + ':3001/api/v1/namesets/' + this.props.nameset.id + '/names')
    .then(response => {
      // console.log("RESPONSE for groups: ", response);
      return response.json();
    })
    .then(response => {
      // console.log("RESPONSEEEEEE: ", response.data);
      this.setState(
        {names: response.data},
      );
    })
    .catch(error => console.log(error));
  }

  render() {
    if (this.props.isOpen === false)
      return null

    const names = this.state.names.map(name => {
      return (
        <li key={name.id}>
          {name.attributes.variants}
        </li>
      );
    });

    return (
      <div>
        <div className="modal_window">
          <h1 className="modal_window__header">
            Namelist title {this.props.nameset.attributes.label}
          </h1>
          <div className="modal_window__body">
            <ol className="modal_window__list">
              {names}
            </ol>
          </div>
          <p className="modal_window__close_button">
            <button onClick={this.close}>Close</button>
          </p>
        </div>
        <div className="modal_shroud"
          onClick={this.close}
        />
      </div>
    )
  }

  close(e) {
    e.preventDefault()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

}
