import React from 'react';
import {Namelist} from './Namelist';

import {API_SERVER} from '../paths';

import './Nameset.css';

export class Nameset extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    nameset: this.props.nameset,
	    isChecked: false,
	    isDisable: true,
	    isNamelistOpen: false,
	    names: [],
	    namesLoaded: false,
	    namesLoading: false,
	};
	this.handleChange = this.handleChange.bind(this);
	this.openNamelist = this.openNamelist.bind(this);
	this.closeNamelist = this.closeNamelist.bind(this);
    }

    openNamelist() {
	if (this.state.namesLoaded === false) {
	    this.setState({namesLoading: true});
	    fetch('http://' + API_SERVER + '/api/v1/namesets/' + this.props.nameset.id + '/names')
		.then(response => {
		    return response.json();
		})
		.then(response => {
		    this.setState(
			{
			    names: response.data,
			    namesLoaded: true,
			    namesLoading: false,
			}
		    );
		})
		.catch(error => {
		    console.log(error);
		    this.setState(
			{
			    namesLoading: false,
			}
		    );
		});
	}
	this.setState(
	    {
		isNamelistOpen: true,
	    }
	);
    }

    closeNamelist() {
	this.setState({ isNamelistOpen: false });
    }

    handleChange() {
	this.setState(({ isChecked }) => (
	    {
		isChecked: !isChecked,
	    }
	));
	this.props.aftertToggleNamesetCheckbox(this.props.nameset.id);

    }

    render() {
	const namesetId = "nameset-" + this.state.nameset.id;

	const namesCount = () => {
	    if (this.props.nameset.attributes["names-count"]) {
		return this.props.nameset.attributes["names-count"].toString();
	    }
	    else {
		return "0";

	    }
	};

	return (
	    <div>
              <div className="group-box__item">
		<input className="group-box__checkbox" id={namesetId} type="checkbox"
		       onChange={this.handleChange} checked={this.state.isChecked}
		/>
		<label className="group-box__label" htmlFor={namesetId}>{this.props.nameset.attributes.label}
		  <button
		    className="group-box__names_number"
		    onClick={this.openNamelist}
		  >
		    {" (" + namesCount() + ")"}
		  </button>
		  <Namelist isOpen={this.state.isNamelistOpen}
			    onClose={this.closeNamelist}
			    namesLoading={this.state.namesLoading}
			    nameset={this.props.nameset}
			    names={this.state.names}
		  />
		</label>
              </div>
	    </div>
	);
    }
}
