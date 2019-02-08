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

import './App.css';

export class App extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    actionButtonText: 'placeholder',
	    selectedNamesets: new Set(),
	    selectedNumberOption: 0,
	    howManyNames: this.props.numberOptions[0].value,
	    generated: [],
	    sorted: [],
	    isGenerating: false,
	    fetchedNames: [],
            pathToLastSortMethod: [0, "ascending"]	    
	};
	this.namesets = {};
	this.buildUrls = this.buildUrls.bind(this);
	this.fetchEverything = this.fetchEverything.bind(this);
	this.handleAction = this.handleAction.bind(this);
	this.registerNameset = this.registerNameset.bind(this);
	this.aftertToggleNamesetCheckbox = this.aftertToggleNamesetCheckbox.bind(this);
        this.beforeFetchingNamesets = this.beforeFetchingNamesets.bind(this);
        this.afterSorting = this.afterSorting.bind(this);
        this.afterChoosingHowManyNames = this.afterChoosingHowManyNames.bind(this);
        this.afterGeneratingNames = this.afterGeneratingNames.bind(this);
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

    beforeFetchingNamesets() {
	this.setState(
	    { isGenerating: true },
	);
    }

    fetchEverything(ids) {
	const fetched = [];
	const promises = [];
	const urlPart1 = "http://" + this.props.API_SERVER + "/api/v1/namesets/";
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
	this.beforeFetchingNamesets();
	this.fetchEverything(Array.from(this.state.selectedNamesets));
    }

    generate() {
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
	const namesetsForGenerator = this.state.fetchedNames.map(nameset => {
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
            return namesetForGenerator;
	});
    	if (namesetsForGenerator.length > 0) {
	    const generator = new Generator(namesetsForGenerator);
	    const generated = generator.generate(this.state.howManyNames);
	    this.afterGeneratingNames(generated);
	}
    }

    afterChoosingHowManyNames(howManyNames, selectedOption) {
	this.setState(
	    {
		howManyNames: howManyNames,
		selectedNumberOption: selectedOption
	    }
	);
    }

    afterGeneratingNames(generated) {
	this.setState(
   	    {
   		generated: generated,
                sorted: generated
   	    },
   	    () => {this.setState( { isGenerating: false } );}
	);
    }

    aftertToggleNamesetCheckbox(id) {
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

    render() {
	return (
	    <div>
	      <Header
		version={this.props.APP_VERSION}
		/>
	      <main className="l-main-container">
		<section className="l-section-container l-section-container--input">
		  <GroupboxContainer
		    groups={this.state.groups}
		    subgroups={this.state.subgroups}
		    namesets={this.state.namesets}
		    aftertToggleNamesetCheckbox={this.aftertToggleNamesetCheckbox}
		    defaultCustomNames={this.state.defaultCustomNames}
		    registerNameset={this.registerNameset}
		    />
		</section>

		<section className="l-section-container l-section-container--output">
		  <HowManyNames
		    options={this.props.numberOptions}
		    selectedOption={this.state.selectedNumberOption}
		    afterChoosingHowManyNames={this.afterChoosingHowManyNames}
		    />
		  <ActionButton
		    isGenerating={this.state.isGenerating}
		    howManyNamesetsSelected={this.state.selectedNamesets.size}
		    howManyNames={this.state.howManyNames}
		    onClick={this.handleAction}
		    />
		  <Sorting
		    generated={this.state.generated}
		    sortingButtons={this.props.sortingButtons}
		    afterSorting={this.afterSorting}
		    />
		  <GeneratedList
		    sorted={this.state.sorted}
		    sortingButtons={this.props.sortingButtons}
		    pathToLastSortMethod={this.state.pathToLastSortMethod}
                    />
   		</section>
	      </main>
	      <Footer />
	    </div>
	);
    }
}
