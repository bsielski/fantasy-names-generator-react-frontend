import React from 'react';
import {CustomNamesArea} from './CustomNamesArea';

import './CustomNameset.css';

export class CustomNameset extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    text: this._arrayToText(this.props.defaultNameset.names),
	    isChecked: false
	};
        this.inputId = "custom-nameset-" + this.props.namesetId;
	this.handleToggle = this.handleToggle.bind(this);
	this.afterChangeTextArea = this.afterChangeTextArea.bind(this);
    }

    _arrayToText(array) {
        return array.join("\n");
    }

    handleToggle() {
	if (this.state.isChecked) {
            this.props.afterToggleCustomNamesetCheckbox(this.props.namesetId, []);
        }
        else {
            this.props.afterToggleCustomNamesetCheckbox(this.props.namesetId, this.state.names);
        }
	this.setState(({ isChecked }) => (
	    {
		isChecked: !isChecked,
	    }
	));
    }

    afterChangeTextArea(event) {
        const text = event.target.value;
	this.setState({
            text: text
        });
        this.props.afterChangeCustomNamesetTextArea(this.props.namesetId, text);
    }

    render() {

	return (
	    <div>
              <div className="group-box__item">
		<input
                  className="group-box__checkbox"
                  id={this.inputId}
                  type="checkbox"
		  onChange={this.handleToggle}
                  checked={this.state.isChecked}
		/>
		<label
                  className="group-box__label"
                  htmlFor={this.inputId}>{this.props.defaultNameset.label}
		</label>
              </div>
              <CustomNamesArea
                namesetId={this.props.namesetId}
		variantSeparator={this.props.defaultNameset.variantSeparator}
                text={this.state.text}
		afterChangeTextArea={this.afterChangeTextArea}
	      />
	    </div>
	);
    }
}
