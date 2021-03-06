import React from 'react';

import HowManyNames from './HowManyNames';
import ActionButton from './ActionButton';
import SortingButtons from './SortingButtons';
import GeneratedList from './GeneratedList';
import RadioButton from './RadioButton';

import './styles.css';

export default function Output (props) {

	  return (
		    <section className="output">
		      <HowManyNames
		        RadioButton={RadioButton}
		        options={props.numberOptions}
		        selectedOption={props.selectedNumberOption}
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
		        RadioButton={RadioButton}
		        generated={props.generated}
		        selectedOption={props.selectedSortingOption}
		        options={props.sortingOptions}
		        afterChoosingSorting={props.afterChoosingSorting}
		      />
		      <GeneratedList
		        sorted={props.sorted}
		        selectedSortingOption={props.selectedSortingOption}
		        sortingOptions={props.sortingOptions}
          />
   		  </section>
	  );
}
