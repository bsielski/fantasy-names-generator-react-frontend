import {sortAlphabeticallyAsc} from './sorting';
import {sortAlphabeticallyDesc} from './sorting';
import {sortByLengthAsc} from './sorting';
import {sortByLengthDesc} from './sorting';
import {unsortAsc} from './sorting';
import {unsortDesc} from './sorting';

export const sortingOptions = [
    {
	id: 0,
	label: "Unsorted",
	defaultSubbutton: "descending",
	ascending: {
	    alt: "from first to last generated",
    	    icon: "002-sort-by-numeric-order.svg",
    	    sort: unsortAsc,
	},
	descending: {
	    alt: "from last to first generated",
    	    icon: "001-sort-by-order.svg",
    	    sort: unsortDesc,
	}
    },
    {
	id: 1,
	label: "Alphabetically",
	defaultSubbutton: "ascending",
	ascending: {
	    alt: "from A to Z",
    	    icon: "006-sort-by-alphabet.svg",
    	    sort: sortAlphabeticallyAsc,
	},
	descending: {
	    alt: "from Z to A",
    	    icon: "003-sort-reverse-alphabetical-order.svg",
    	    sort: sortAlphabeticallyDesc,
	}
    },
    {
	id: 2,
	label: "By name length",
	defaultSubbutton: "ascending",
	ascending: {
	    alt: "from shortest to longest",
    	    icon: "005-sort-by-attributes-interface-button-option.svg",
    	    sort: sortByLengthAsc,
	},
	descending: {
	    alt: "from longest to shortest",
    	    icon: "004-sort-by-attributes.svg",
    	    sort: sortByLengthDesc,
	}
    },
];
