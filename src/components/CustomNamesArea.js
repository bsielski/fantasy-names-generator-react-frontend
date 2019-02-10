import React from 'react';

import './CustomNamesArea.css';

import {API_SERVER} from '../paths';

export class CustomNamesArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    arrayToText(array) {
        let result = "";
        array.forEach(variant => {
            result += variant + "\n";
        });
        return result;
    }

    textToArray(text) {
        let result = text.split("\n");
        result = result.filter(v => v.trim() !== '');
        return result;
    }

    handleChange(event) {
        this.setState({names: event.target.value});
        this.props.registerNameset(this.props.namesetId, this.textToArray(event.target.value));
    }

    componentDidMount() {
        if (this.props.custom === true) {
            fetch('http://' + API_SERVER + '/api/v1/names?filter[nameset-id]=' + this.props.namesetId)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    this.setState(
                        {names:  this.arrayToText(response.data.map(name => name.attributes.variants))},
                    );
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        if (this.props.custom === true) {
            return (
                <textarea
                  name="textarea"
                  className="custom_names__text_area"
                  rows="10"
                  value={this.state.names}
                  onChange={this.handleChange}
                >
                </textarea>
            );
        }
        else {
            return null;
        }
    }
}
