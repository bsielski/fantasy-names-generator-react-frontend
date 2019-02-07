import React from 'react';
import {HowManyNames} from './HowManyNames';
import {Header} from './Header';
import {Footer} from './Footer';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';
import {GeneratedList} from './GeneratedList';
import {Sorting} from './Sorting';

import {Generator} from '../generator';
import {Splitter} from '../splitter';
import {VOWELS} from '../helpers';
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
	    sorted: [],
	    isGenerating: false,
	    fetchedNames: [],
            pathToLastSortMethod: [0, "ascending"]	    
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
	this.buildUrls = this.buildUrls.bind(this);
	this.fetchEverything = this.fetchEverything.bind(this);
	this.handleAction = this.handleAction.bind(this);
	this.registerNameset = this.registerNameset.bind(this);
	this.sortingButtons = this.props.sortingButtons;
        this.afterSorting = this.afterSorting.bind(this);
    }

    registerNameset(id, nameset) {
	this.namesets[id] = nameset;
    }

    afterSorting(sorted, pathToLastSortMethod) {
	this.setState({
	    sorted: sorted,
	    pathToLastSortMethod: pathToLastSortMethod
	});
    }

    buildUrls(begin, ids, end) {
	return ids.map(function(id){
            return begin + id + end;
	});
    }

    fetchEverything(ids) {
	const fetched = [];
	const promises = [];
	const urlPart1 = "http://" + API_SERVER + "/api/v1/namesets/";
	const urls = this.buildUrls(urlPart1, ids, "?include=names");
	for (let i = 0; i < urls.length; i++) {
	    promises.push(
		fetch(urls[i])
		    .then(response => response.json())
		    .then(response => {
			if (response.included) {
			    fetched.push([response.data, response.included]);
			}
		    })
		    .catch(error => console.log(error))
	    )
	}
	Promise.all(promises).then(() => {
	    this.setState(
		{ fetchedNames: fetched },
		this.generate
	    );
	})
    }

    handleAction(e) {
	e.preventDefault();
	this.setState(
	    { isGenerating: true },
	);
	this.fetchEverything(Array.from(this.state.selectedNamesets));
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
	    const generator = new Generator(namesetsForGenerator);
	    const generated = generator.generate(this.numberOptions[this.state.selectedNumberOption].value);
	    this.setState(
   		{
   		    generated: generated,
                    sorted: generated
   		},
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
		  <GroupboxContainer
		    groups={this.state.groups}
		    subgroups={this.state.subgroups}
		    namesets={this.state.namesets}
		    handleCheckboxChange={this.toggleCheckbox}
		    defaultCustomNames={this.state.defaultCustomNames}
		    registerNameset={this.registerNameset}
		    />
		</section>

		<section className="l-section-container l-section-container--output">
		  <HowManyNames
		    options={this.numberOptions}
		    selectedOption={this.state.selectedNumberOption}
		    setHowManyNames={this.setHowManyNames}
		    />
		  <ActionButton
		    isGenerating={this.state.isGenerating}
		    howManyNamesetsSelected={this.state.selectedNamesets.size}
		    howManyNames={this.numberOptions[this.state.selectedNumberOption].value}
		    onClick={this.handleAction}
		    />
                  <Sorting
		    generated={this.state.generated}
		    sortingButtons={this.sortingButtons}
		    afterSorting={this.afterSorting}
		    />
        	  <GeneratedList
		    sorted={this.state.sorted}
		    sortingButtons={this.sortingButtons}
		    pathToLastSortMethod={this.state.pathToLastSortMethod}
                    />
   		</section>
	      </main>
	      <Footer />
	    </div>
	);
    }
}
