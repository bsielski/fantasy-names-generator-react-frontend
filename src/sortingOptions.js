import {sortAlphabeticallyAsc} from './sortings';
import {sortAlphabeticallyDesc} from './sortings';
import {sortByLengthAsc} from './sortings';
import {sortByLengthDesc} from './sortings';
import {unsortAsc} from './sortings';
import {unsortDesc} from './sortings';


export const sortingOptions = [
    {
	label: "Unsorted",
	alt: "from first to last generated",
    	icon: "002-sort-by-numeric-order.svg",
    	sort: unsortAsc,
    },
    {
	label: "Unsorted",
	alt: "from last to first generated",
    	icon: "001-sort-by-order.svg",
    	sort: unsortDesc,
    },
    {
	label: "Alphabetically",
	alt: "from A to Z",
    	icon: "006-sort-by-alphabet.svg",
    	sort: sortAlphabeticallyAsc,
    },
    {
	label: "Alphabetically",
	alt: "from Z to A",
    	icon: "003-sort-reverse-alphabetical-order.svg",
    	sort: sortAlphabeticallyDesc,
    },
    {
	label: "By name length",
	alt: "from shortest to longest",
    	icon: "005-sort-by-attributes-interface-button-option.svg",
    	sort: sortByLengthAsc,
    },
    {
	label: "By name length",
	alt: "from longest to shortest",
    	icon: "004-sort-by-attributes.svg",
    	sort: sortByLengthDesc,
    },
];
