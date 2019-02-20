import {Splitter} from './splitter';
import {VOWELS} from './helpers';
import {RepeatedLettersFilter} from './filter';
import {ConsonantsPatternsFilter} from './filter';
import {VowelsPatternsFilter} from './filter';
import {UniquenessFilter} from './filter';
import {NameLengthFilter} from './filter';
import {CapitalizeFilter} from './filter';

export const buildNamesetsForGenerator = (fetchedNames, customNamesets) => {
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
    	    names: nameset[1].map(nameset => nameset.attributes.variants),
    	    splitters: [splitterAfter, splitterBefore],
    	    filters: standardFilters,
	};
	return namesetForGenerator;
    });
    const allNamesetsForGenerator = namesetsForGenerator.concat(
	Object.keys(customNamesets).map(id => customNamesets[id])
    );
    return allNamesetsForGenerator;
};
