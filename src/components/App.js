import React from 'react';
import {HowManyNames} from './HowManyNames';
import {Header} from './Header';
import {Footer} from './Footer';
import {GroupboxContainer} from './GroupboxContainer';
import {ActionButton} from './ActionButton';
import {GeneratedList} from './GeneratedList';
import {Sorting} from './Sorting';

import {addOrRemove} from '../helpers';

import './App.css';

export class App extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    actionButtonText: 'placeholder',
	    selectedNamesets: [],
	    selectedCustomNamesetIds: [],
	    selectedNumberOption: 0,
	    howManyNames: this.props.numberOptions[0].value,
	    generated: [],
	    sorted: [],
	    isLoading: false,
	    isGenerating: false,
            pathToLastSortMethod: [0, "ascending"]	    
	};
	this.customNamesets = this.props.customNamesetsForGenerator;
	this.aftertToggleNamesetCheckbox = this.aftertToggleNamesetCheckbox.bind(this);
	this.aftertToggleCustomNamesetCheckbox = this.aftertToggleCustomNamesetCheckbox.bind(this);
	this.aftertChangeCustomNamesetTextArea = this.aftertChangeCustomNamesetTextArea.bind(this);
	this.updateCustomNames = this.updateCustomNames.bind(this);
        this.afterChoosingHowManyNames = this.afterChoosingHowManyNames.bind(this);
        this.afterClickingGenerateButton = this.afterClickingGenerateButton.bind(this);
        this.beforeFetchingNamesets = this.beforeFetchingNamesets.bind(this);
        this.afterFetchingNamesets = this.afterFetchingNamesets.bind(this);
        this.afterGeneratingNames = this.afterGeneratingNames.bind(this);
        this.afterSorting = this.afterSorting.bind(this);
    }

    afterSorting(sorted, pathToLastSortMethod) {
	this.setState({
	    sorted: sorted,
	    pathToLastSortMethod: pathToLastSortMethod
	});
    }

    afterClickingGenerateButton() {
        const pickedCustomNamesets = this.state.selectedCustomNamesetIds.map(id => this.customNamesets[id]);
	this.props.generate(this.beforeFetchingNamesets, this.state.selectedNamesets,
                            this.afterFetchingNamesets,
                            this.afterGeneratingNames, this.state.howManyNames,
                            pickedCustomNamesets
                           );
    }

    beforeFetchingNamesets() {
	this.setState(
	    { isGenerating: true }
	);
    }

    afterFetchingNamesets() {
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
	this.setState(previous => {
	    return {
                selectedNamesets: addOrRemove(previous.selectedNamesets, id)
            };
	});            
    }

    aftertToggleCustomNamesetCheckbox(id) {
	this.setState(previous => {
	    return {
                selectedCustomNamesetIds: addOrRemove(previous.selectedCustomNamesetIds, id)
            };
	});            
    }

    aftertChangeCustomNamesetTextArea(id, text) {
        let names = text.split("\n");
        names = names.filter(v => v.trim() !== '');
        this.customNamesets[id].names = names;
    }

    updateCustomNames(id, names) {
	this.setState(previous => {
	    return {
                selectedCustomNamesetIds: addOrRemove(previous.selectedCustomNamesetIds, id)
            };
	});            

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
		    aftertToggleNamesetCheckbox={this.aftertToggleNamesetCheckbox}
		    aftertToggleCustomNamesetCheckbox={this.aftertToggleCustomNamesetCheckbox}
                    aftertChangeCustomNamesetTextArea={this.aftertChangeCustomNamesetTextArea}
                    fetchGroupsSubgroupsNamesets={this.props.fetchGroupsSubgroupsNamesets}
                    customNamesetsForGenerator={this.props.customNamesetsForGenerator}
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
		    howManyNamesetsSelected={
                        this.state.selectedNamesets.length
                        + this.state.selectedCustomNamesetIds.length
                    }
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
