import React from 'react';
import {RadioGroup} from './RadioGroup';
import {Header} from './Header';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';
import {GeneratedList} from './GeneratedList';

import {Generator} from '../generator';
import {Splitter} from '../splitter';
import {VOWELS} from '../helpers';
// import {CONSONANTS} from '../helpers';
import {RepeatedLettersFilter} from '../filter';
import {ConsonantsPatternsFilter} from '../filter';
import {VowelsPatternsFilter} from '../filter';
import {UniquenessFilter} from '../filter';
import {NameLengthFilter} from '../filter';
import {CapitalizeFilter} from '../filter';
import {API_SERVER} from '../paths';
import {APP_VERSION} from '../version';

import './App.css';

export class App extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    actionButtonText: 'placeholder',
	    selectedNamesets: new Set(),
	    selectedNumberOption: 0,
	    generated: [],
	    isGenerating: false,
	    fetchedNames: [],
	};
	this.namesets = {};
	this.numberOptions = [
	    {value: 10, label: '10', description: "(I feel very lucky).",},
	    {value: 100, label: '100', description: "",},
	    {value: 500, label: '500', description: "",},
	    {value: 5000, label: '5000', description: "",},
	];
	this.toggleCheckbox = this.toggleCheckbox.bind(this);
	this.setHowManyNames = this.setHowManyNames.bind(this);
	this.handleAction = this.handleAction.bind(this);
	this.registerNameset = this.registerNameset.bind(this);
    }

    registerNameset(id, nameset) {
	this.namesets[id] = nameset;
    }


    handleAction(e) {
	e.preventDefault();
	this.setState(
	    { isGenerating: true },
	);

	// console.log("CLICKED, NAMESETS: ", this.namesets);
	const fetched = [];
	let counter = 0;
	const fetchEverything = (ids) => {
	    fetch(`http://` + API_SERVER + `/api/v1/namesets/${ids[counter]}?include=names`)
		.then(response => response.json())
		.then(response => {
		    if (response.included) {
			fetched.push([response.data, response.included]);
		    }
		    counter ++;
		    if (counter < ids.length) {
			fetchEverything(ids);
		    } else {
			this.setState(
			    { fetchedNames: fetched },
			    // her handle custom names
			    this.generate
			);
		    }
		})
		.catch(error => console.log(error));
	};
	fetchEverything(Array.from(this.state.selectedNamesets));
    }

    generate() {

	const namesetsForGenerator = [];
	const splitterAfter = new Splitter(VOWELS, true, "after")
	const splitterBefore = new Splitter(VOWELS, true, "before")
	const standardFilters = [
	    RepeatedLettersFilter,
	    ConsonantsPatternsFilter,
	    VowelsPatternsFilter,
	    UniquenessFilter,
	    NameLengthFilter,
	    CapitalizeFilter,
	]
	// console.log("WTF IS THIS:", this.state.fetchedNames)
	this.state.fetchedNames.forEach(nameset => {
            const namesetForGenerator = {
		label: nameset[0].attributes.label,
		names: [],
		splitters: [splitterAfter, splitterBefore],
		filters: standardFilters,
            }
            nameset[1].forEach(name => {
		if (this.namesets[nameset[0].id]) {
		    namesetForGenerator.names.push(this.namesets[nameset[0].id]);
		}
		else {
		    namesetForGenerator.names.push(name.attributes.variants);
		}
            });
            namesetsForGenerator.push(namesetForGenerator);
	});

	if (namesetsForGenerator.length > 0) {
	    const generator = new Generator(namesetsForGenerator)
	    this.setState(
		{generated: generator.generate(this.numberOptions[this.state.selectedNumberOption].value)},
		() => {this.setState( { isGenerating: false } );}
	    );
	}

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
    }

    render() {
	return (
            <div>
              <Header
		version={APP_VERSION}
		/>
              <main className="l-main-container">
		<section className="l-section-container l-section-container--input">
		  <div>
		    <GroupboxContainer
                      groups={this.state.groups}
                      subgroups={this.state.subgroups}
                      namesets={this.state.namesets}
                      handleCheckboxChange={this.toggleCheckbox}
                      defaultCustomNames={this.state.defaultCustomNames}
                      registerNameset={this.registerNameset}
		      />
		    <ActionButton
                      isGenerating={this.state.isGenerating}
                      howManyNamesetsSelected={this.state.selectedNamesets.size}
                      howManyNames={this.numberOptions[this.state.selectedNumberOption].value}
                      onClick={this.handleAction}
		      />
		    <RadioGroup
		      options={this.numberOptions}
		      selectedOption={this.state.selectedNumberOption}
		      setHowManyNames={this.setHowManyNames}
		      />

		  </div>
		</section>

		<section className="l-section-container l-section-container--output">
        	  <div>
		    <GeneratedList generated={this.state.generated} />
        	  </div>
		</section>
	      </main>
	    </div>
	);
    }
}
