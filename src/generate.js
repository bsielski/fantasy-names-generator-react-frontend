import {Generator} from './generator';
import {Splitter} from './splitter';
import {VOWELS} from './helpers';
import {RepeatedLettersFilter} from './filter';
import {ConsonantsPatternsFilter} from './filter';
import {VowelsPatternsFilter} from './filter';
import {UniquenessFilter} from './filter';
import {NameLengthFilter} from './filter';
import {CapitalizeFilter} from './filter';

import {curry} from 'ramda';

export const generate = curry(
    async (beforeFetchingNamesets, selectedNamesets, API_SERVER, afterFetchingNamesets, afterGeneratingNames, howManyNames, namesets, fetchNamesets) => {
	const buildUrls = (begin, ids, end) => {
	    return ids.map(function(id){
		return begin + id + end;
	    });
	};
	
	const buildNamesetsForGenerator = (fetchedNames, namesets) => {
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
    		    if (namesets[nameset[0].id]) {
    			namesetForGenerator.names.push(namesets[nameset[0].id]);
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
		return generator.generate(howManyNames);
	    }
	};

	beforeFetchingNamesets();
	const namesetIds = Array.from(selectedNamesets);
	const urlPart1 = "http://" + API_SERVER + "/api/v1/namesets/";
	const urls = buildUrls(urlPart1, namesetIds, "?include=names");
	const promisedFetched = fetchNamesets(urls);
	const fetched = await Promise.all(promisedFetched);
	afterFetchingNamesets();
	const namesetsForGenerator = buildNamesetsForGenerator(fetched, namesets);
	const generated = generate(namesetsForGenerator);
	afterGeneratingNames(generated);
    }
);
