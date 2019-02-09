import React from 'react';

import {Generator} from '../generator';
import {Splitter} from '../splitter';
import {VOWELS} from '../helpers';
import {RepeatedLettersFilter} from '../filter';
import {ConsonantsPatternsFilter} from '../filter';
import {VowelsPatternsFilter} from '../filter';
import {UniquenessFilter} from '../filter';
import {NameLengthFilter} from '../filter';
import {CapitalizeFilter} from '../filter';

import './ActionButton.css';

export function ActionButton(props) {

    const isDisabled = () => {
	if (props.isGenerating) {
	    return true;
	}
	else if (props.howManyNamesetsSelected === 0) {
	    return true;
	}
	else {
	    return false;
	}
    };

    const generateButtonText = () => {
	if (props.isGenerating) {
	    return "Generating, please wait"
	}
	else if (props.howManyNamesetsSelected === 0) {
	    return "Select some nameset or namesets"
	}
	else {
	    return "Generate " + props.howManyNames + " names"
	}
    };

    const buildUrls = (begin, ids, end) => {
	return ids.map(function(id){
            return begin + id + end;
	});
    };

    const fetchNamesets = (urls) => {
	return urls.map(url => {
	    return fetch(url)
		.then(response => response.json())
		.then(response => {
		    return [response.data, response.included];
		})
		.catch(error => console.log(error))	    
	});
    };

    const buildNamesetsForGenerator = (fetchedNames) => {
	const splitterAfter = new Splitter(VOWELS, true, "after");
	const splitterBefore = new Splitter(VOWELS, true, "before");
	const standardFilters = [
            RepeatedLettersFilter,
            ConsonantsPatternsFilter,
            VowelsPatternsFilter,
            UniquenessFilter,
            NameLengthFilter,
            CapitalizeFilter,
	];
	const namesetsForGenerator = fetchedNames.map(nameset => {
            const namesetForGenerator = {
    		label: nameset[0].attributes.label,
    		names: [],
    		splitters: [splitterAfter, splitterBefore],
    		filters: standardFilters,
            };
            nameset[1].forEach(name => {
    		if (props.namesets[nameset[0].id]) {
    		    namesetForGenerator.names.push(props.namesets[nameset[0].id]);
    		}
    		else {
    		    namesetForGenerator.names.push(name.attributes.variants);
    		}
            });
            return namesetForGenerator;
	});
	return namesetsForGenerator;
    };

    const generate = (namesetsForGenerator) => {
    	if (namesetsForGenerator.length > 0) {
	    const generator = new Generator(namesetsForGenerator);
	    return generator.generate(props.howManyNames);
	}
    };

    const handleAction = async (e) => {
	e.preventDefault();
	props.beforeFetchingNamesets();
	const namesetIds = Array.from(props.selectedNamesets);
	const urlPart1 = "http://" + props.API_SERVER + "/api/v1/namesets/";
	const urls = buildUrls(urlPart1, namesetIds, "?include=names");
	const promisedFetched = fetchNamesets(urls);
	const fetched = await Promise.all(promisedFetched);
	props.afterFetchingNamesets(fetched);
	const namesetsForGenerator = buildNamesetsForGenerator(fetched);
	const generated = generate(namesetsForGenerator);
	props.afterGeneratingNames(generated);
    };

    return (
	<section className="action_button">
	  <h2 className="action_button__header">Generate names</h2>
  	  <button
            type="button"
            id="generate-button"
            className="action_button__button"
            disabled={ isDisabled() }
            onClick={handleAction}
            >
            {generateButtonText()}
	  </button>
	</section>
    );
}
