import React from 'react';
import {HowManyNames} from './HowManyNames';
import {Header} from './Header';
import {Footer} from './Footer';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';
import {GeneratedList} from './GeneratedList';
import {Sorting} from './Sorting';

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
	    isLoading: false,
	    isGenerating: false,
            pathToLastSortMethod: [0, "ascending"]	    
	};
	this.namesets = {};
	this.registerNameset = this.registerNameset.bind(this);
	this.aftertToggleNamesetCheckbox = this.aftertToggleNamesetCheckbox.bind(this);
        this.afterChoosingHowManyNames = this.afterChoosingHowManyNames.bind(this);
        this.afterClickingGenerateButton = this.afterClickingGenerateButton.bind(this);
        this.beforeFetchingNamesets = this.beforeFetchingNamesets.bind(this);
        this.afterFetchingNamesets = this.afterFetchingNamesets.bind(this);
        this.afterGeneratingNames = this.afterGeneratingNames.bind(this);
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

    afterClickingGenerateButton() {
	this.props.generate(
	    this.beforeFetchingNamesets,
	    this.state.selectedNamesets,
	    this.props.API_SERVER,
	    this.afterFetchingNamesets,
	    this.afterGeneratingNames,
	    this.state.howManyNames,
	    this.namesets
	)
    }

    beforeFetchingNamesets() {
	this.setState(
	    { isLoading: true }
	);
    }

    afterFetchingNamesets() {
	this.setState(
	    {
		isLoading: false,
		isGenerating: true
	    }
	)
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
                sorted: generated,
		isGenerating: false,
		pathToLastSortMethod: [0, "ascending"]
   	    }
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
		    isLoading={this.state.isLoading}
		    howManyNamesetsSelected={this.state.selectedNamesets.size}
		    howManyNames={this.state.howManyNames}
		    afterClickingGenerateButton={this.afterClickingGenerateButton}
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
