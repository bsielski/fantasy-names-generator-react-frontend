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
      selectedNamesets: new Set(),
      selectedNumberOption: 0,
    };
    this.numberOptions = [
      {value: 10, label: '10', description: "(I feel very lucky).",},
      {value: 100, label: '100', description: "",},
      {value: 500, label: '500', description: "",},
      {value: 10000, label: '10000', description: "",},
    ];
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setHowManyNames = this.setHowManyNames.bind(this);

  }

  setHowManyNames(option) {
    this.setState(
      { selectedNumberOption: option }
    );
  }

  toggleCheckbox(id) {
    if (this.state.selectedNamesets.has(id)) {
      this.setState(previousState => {
        previousState.selectedNamesets.delete(id);
        return { selectedNamesets: previousState.selectedNamesets };
      });
    } else {
      this.setState(previousState => {
        return { selectedNamesets: previousState.selectedNamesets.add(id) };
      });
    }
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
            <RadioGroup options={this.numberOptions}
              selectedOption={this.state.selectedNumberOption}
              setHowManyNames={this.setHowManyNames}
            />
            <GroupboxContainer groups={this.state.groups} subgroups={this.state.subgroups}
              namesets={this.state.namesets} handleCheckboxChange={this.toggleCheckbox} />
            <ActionButton howManyNamesetsSelected={this.state.selectedNamesets.size}
              howManyNames={this.numberOptions[this.state.selectedNumberOption].value}
            />
            {/* <DebugInfo namesets={this.state.selectedNamesets} /> */}
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
}

// function DebugInfo(props) {
//   console.log("WTF IS SELECTED NAMESET");
//   console.log(props.namesets);
//   const buildNamesets = (id, index) => {
//     return (
//       <p key={index}>{id}</p>
//     );
//   }
//
//   const namesets = Array.from(props.namesets).map(buildNamesets)
//
//   return (
//     <div>
//       debug<br />
//       {namesets}
//     </div>
//   );
// }
