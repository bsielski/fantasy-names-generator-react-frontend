import React from 'react';

import HowManyNames from './HowManyNames';
import ActionButton from './ActionButton';
import SortingButtons from './SortingButtons';
import GeneratedList from './GeneratedList';

import './styles.css';

export default function Output (props) {

	  return (
		    <section className="output">
		      <HowManyNames
		        options={props.options}
		        selectedOption={props.selectedOption}
		        afterChoosingHowManyNames={props.afterChoosingHowManyNames}
		      />
		      <ActionButton
		        isGenerating={props.isGenerating}
		        isLoading={props.isLoading}
		        howManyNamesetsSelected={props.howManyNamesetsSelected}
		        howManyNames={props.howManyNames}
		        afterClickingGenerateButton={props.afterClickingGenerateButton}
		      />
		      <SortingButtons
		        generated={props.generated}
		        selectedOption={props.selectedOption}
		        sortingOptions={props.sortingOptions}
		        afterChoosingSorting={props.afterChoosingSorting}
		      />
		      <GeneratedList
		        sorted={props.sorted}
		        selectedSortingOption={props.selectedSortingOption}
		        sortingOptions={props.sortingOptions}
		        pathToLastSortMethod={props.pathToLastSortMethod}
          />
   		  </section>
	  );
}
