import {RepeatedLettersFilter} from './filter';
import {ConsonantsPatternsFilter} from './filter';
import {VowelsPatternsFilter} from './filter';
import {UniquenessFilter} from './filter';
import {NameLengthFilter} from './filter';
import {CapitalizeFilter} from './filter';
import {VOWELS} from './helpers';

const standardFilters = [
    RepeatedLettersFilter,
    ConsonantsPatternsFilter,
    VowelsPatternsFilter,
    UniquenessFilter,
    NameLengthFilter,
    CapitalizeFilter,
];

const standardSplitters = [
    {
	"_regex": {},
	"_separators": VOWELS,
	"_where": "after",
	"_caseless": true
    },
    {
	"_regex": {},
	"_separators": VOWELS,
	"_where": "before",
	"_caseless": true
    }
];

export const customNamesetsForGenerator = [
    {
	"label": "Type some names here",
	"names": ["Some", "Example", "Words"],
	"splitters": standardSplitters,
	"filters": standardFilters
    },

    {
	"label": "Type some names here",
	"names": ["Another", "Custom", "Names"],
	"splitters": standardSplitters,
	"filters": standardFilters
    }
]
