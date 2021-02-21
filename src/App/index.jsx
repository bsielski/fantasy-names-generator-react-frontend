import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Input from './Input';
import Output from './Output';

import {addOrRemove} from '../helpers';

import './styles.css';

import PropTypes from 'prop-types';

export default class App extends React.Component {
    constructor(props) {
	      super(props);
	      this.state = {
	          actionButtonText: 'placeholder',
	          selectedNamesets: [],
	          selectedCustomNamesetIds: [],
	          selectedNumberOption: 0,
	          selectedSortingOption: 0,
	          howManyNames: this.props.numberOptions[0].value,
	          generated: [],
	          sorted: [],
	          isLoading: false,
	          isGenerating: false,
            pathToLastSortMethod: [0, "ascending"]
	      };
	      this.customNamesets = this.props.customNamesetsForGenerator;
	      this.afterToggleNamesetCheckbox = this.afterToggleNamesetCheckbox.bind(this);
	      this.afterToggleCustomNamesetCheckbox = this.afterToggleCustomNamesetCheckbox.bind(this);
	      this.afterChangeCustomNamesetTextArea = this.afterChangeCustomNamesetTextArea.bind(this);
	      this.updateCustomNames = this.updateCustomNames.bind(this);
        this.afterChoosingHowManyNames = this.afterChoosingHowManyNames.bind(this);
        this.afterClickingGenerateButton = this.afterClickingGenerateButton.bind(this);
        this.beforeFetchingNamesets = this.beforeFetchingNamesets.bind(this);
        this.afterFetchingNamesets = this.afterFetchingNamesets.bind(this);
        this.afterGeneratingNames = this.afterGeneratingNames.bind(this);
        this.afterSorting = this.afterSorting.bind(this);
        this.afterChoosingSorting = this.afterChoosingSorting.bind(this);
    }

    afterSorting(sorted, pathToLastSortMethod) {
	      this.setState({
	          sorted: sorted,
	          pathToLastSortMethod: pathToLastSortMethod
	      });
    }

    async afterChoosingSorting(selectedOptionIndex) {
        const prevOptionIndex = this.state.selectedSortingOption;
        this.setState(
            {
	              selectedSortingOption: selectedOptionIndex
	          }
        );
        const sorted = await this.props.optimizedSortNames(
            this.props.sortingOptions,
            selectedOptionIndex,
            prevOptionIndex,
            this.state.generated,
            this.state.sorted
        );
	      this.setState(
            {
	              sorted: sorted,
	          }
        );
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

    async afterGeneratingNames(generated) {
        const sorted = await this.props.sortNames(this.props.sortingOptions, this.state.selectedSortingOption, generated);
	      this.setState(
   	        {
   		          generated: generated,
                sorted: sorted,
		            isGenerating: false,
		            pathToLastSortMethod: [0, "ascending"]
   	        }
	      );
    }

    afterToggleNamesetCheckbox(id) {
	      this.setState(previous => {
	          return {
                selectedNamesets: addOrRemove(previous.selectedNamesets, id)
            };
	      });
    }

    afterToggleCustomNamesetCheckbox(id) {
	      this.setState(previous => {
	          return {
                selectedCustomNamesetIds: addOrRemove(previous.selectedCustomNamesetIds, id)
            };
	      });
    }

    afterChangeCustomNamesetTextArea(id, text) {
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
	          <div className="app-container">
	            <Header
                className="header"
		            APP_VERSION={this.props.APP_VERSION}
	            />
              <Output
		            numberOptions={this.props.numberOptions}
		            selectedNumberOption={this.state.selectedNumberOption}
		            selectedSortingOption={this.state.selectedSortingOption}
		            afterChoosingHowManyNames={this.afterChoosingHowManyNames}
		            isGenerating={this.state.isGenerating}
		            isLoading={this.state.isLoading}
		            howManyNamesetsSelected={
                    this.state.selectedNamesets.length
                        + this.state.selectedCustomNamesetIds.length
                }
		            howManyNames={this.state.howManyNames}
		            afterClickingGenerateButton={this.afterClickingGenerateButton}
		            generated={this.state.generated}
		            sortingOptions={this.props.sortingOptions}
		            afterChoosingSorting={this.afterChoosingSorting}
		            sorted={this.state.sorted}
		            pathToLastSortMethod={this.state.pathToLastSortMethod}
              />
              <Input
                API_SERVER={this.props.API_SERVER}
		            afterToggleNamesetCheckbox={this.afterToggleNamesetCheckbox}
		            afterToggleCustomNamesetCheckbox={this.afterToggleCustomNamesetCheckbox}
                afterChangeCustomNamesetTextArea={this.afterChangeCustomNamesetTextArea}
                fetchGroupsSubgroupsNamesets={this.props.fetchGroupsSubgroupsNamesets}
                customNamesetsForGenerator={this.props.customNamesetsForGenerator}
              />
	            <Footer />
	          </div>
	      );
    }
}

App.propTypes = {
    sortingOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    APP_VERSION: PropTypes.string.isRequired,
    API_SERVER: PropTypes.string.isRequired,
    generate: PropTypes.func.isRequired,
    sortNames: PropTypes.func.isRequired,
    optimizedSortNames: PropTypes.func.isRequired,
    fetchGroupsSubgroupsNamesets: PropTypes.func.isRequired,
    customNamesetsForGenerator: PropTypes.arrayOf(PropTypes.object).isRequired,
};
