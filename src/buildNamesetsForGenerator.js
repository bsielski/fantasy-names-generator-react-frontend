import {Splitter} from './splitter';
import {VOWELS} from './helpers';
import {RepeatedLettersFilter} from './filter';
import {ConsonantsPatternsFilter} from './filter';
import {VowelsPatternsFilter} from './filter';
import {UniquenessFilter} from './filter';
import {NameLengthFilter} from './filter';
import {CapitalizeFilter} from './filter';

export const buildNamesetsForGenerator = (fetchedNames, namesets) => {
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
