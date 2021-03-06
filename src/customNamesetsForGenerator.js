import {RepeatedLettersFilter} from './filter';
import {ConsonantsPatternsFilter} from './filter';
import {VowelsPatternsFilter} from './filter';
import {UniquenessFilter} from './filter';
import {NameLengthFilter} from './filter';
import {CapitalizeFilter} from './filter';
import {VOWELS} from './helpers';
import {Splitter} from './splitter';

const standardFilters = [
    RepeatedLettersFilter,
    ConsonantsPatternsFilter,
    VowelsPatternsFilter,
    UniquenessFilter,
    NameLengthFilter,
    CapitalizeFilter,
];

const standardSplitters = [
    new Splitter(VOWELS, true, "after"),
    new Splitter(VOWELS, true, "before")
];

export const customNamesetsForGenerator = [
    {
	"label": "Use names typed below",
	"names": ["Some", "Example", "Words"],
	"splitters": standardSplitters,
	"filters": standardFilters,
	"variantSeparator": ","
    },

    {
	"label": "Use names typed below",
	"names": ["Another", "Custom", "Names"],
	"splitters": standardSplitters,
	"filters": standardFilters,
	"variantSeparator": ","
    }
]
