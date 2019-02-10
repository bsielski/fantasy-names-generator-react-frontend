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

import {API_SERVER} from './paths';
import {fetchNamesets} from './fetchNamesets';

export const buildUrlsForNamesetIds = curry((API_SERVER, ids) => {
    const urlPart1 = "http://" + API_SERVER + "/api/v1/namesets/";
    return ids.map(id => {
	return urlPart1 + id + "?include=names";
    });
})(API_SERVER);

export const generate = curry(
    async (buildUrlsForNamesetIds, fetchNamesets, beforeFetchingNamesets, selectedNamesets, afterFetchingNamesets, afterGeneratingNames, howManyNames, namesets) => {
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
	const urls = buildUrlsForNamesetIds(namesetIds);
	const promisedFetched = fetchNamesets(urls);
	const fetched = await Promise.all(promisedFetched);
	afterFetchingNamesets();
	const namesetsForGenerator = buildNamesetsForGenerator(fetched, namesets);
	const generated = generate(namesetsForGenerator);
	afterGeneratingNames(generated);
    }
)(buildUrlsForNamesetIds, fetchNamesets);
