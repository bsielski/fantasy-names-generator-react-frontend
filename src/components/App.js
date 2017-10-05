import React from 'react';
import {RadioGroup} from './RadioGroup';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';

// import {ActionButton} from './ActionButton';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      subgroups: [],
      namesets: [],
      actionButtonText: 'placeholder',
      selectedNamesets: [],
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(e) {
    this.setState({selectedNamesets: parseInt(e.target.dataset.buttonNumber, 10)});
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/groups')
    .then(response => response.json())
    .then(response => {
      this.setState({
        groups: response.data,
      });
      })
    .catch(error => console.log(error));
    fetch('http://localhost:3001/api/v1/subgroups')
    .then(response => response.json())
    .then(response => {
      this.setState({
        subgroups: response.data,
      });
      })
    .catch(error => console.log(error));
    fetch('http://localhost:3001/api/v1/namesets')
    .then(response => response.json())
    .then(response => {
      this.setState({
        namesets: response.data,
      });
      })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <main className="l-main-container">
        <section className="l-section-container l-section-container--input">
          <div id="input-section">
            <RadioGroup options={
              [
                {value: 10, label: '10', description: "(I feel very lucky).",},
                {value: 100, label: '100', description: "",},
                {value: 500, label: '500', description: "",},
                {value: 10000, label: '10000', description: "",},
              ]
            }/>
            <GroupboxContainer groups={this.state.groups} subgroups={this.state.subgroups} namesets={this.state.namesets} />
            <ActionButton text={this.state.actionButtonText}/>
            <DebugInfo namesets={this.state.selectedNamesets} />
          </div>
        </section>

        <section className="l-section-container l-section-container--output">
        	<div>
        	  <h2 className="subsection-header">Sorting</h2>
        	  <div className="sort-buttons">
        	    <button type="button" id="unsort-button" className="sort-button">Unsort</button>
        	    <button type="button" id="alphabetically-button" className="sort-button">Alphabetically</button>
        	    <button type="button" id="length-button" className="sort-button">By length</button>
        	  </div>
        	  <h2 className="subsection-header">Generated names</h2>
        	  <ol className="list-of-generated" id="list-of-generated"></ol>
        	</div>
        </section>
      </main>
    );
  }

  function DebugInfo(props) {
    const buildNamesets = (nameset, index) => {
      return (
        <p key={index}>{nameset.label}</p>
      );
    }

    const namesets = props.namesets.map(buildNamesets)

    return (
      <div>
        {namesets}
      </div>
    );
  }

}
