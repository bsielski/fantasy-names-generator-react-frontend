import {curry} from 'ramda';

import {Generator} from './generator';

export const buildRandomNames = curry(
    (Generator, namesetsForGenerator, howManyNames) => {
	if (namesetsForGenerator.length > 0) {
	    const generator = new Generator(namesetsForGenerator);
	    return generator.generate(howManyNames);
	}
    }
)(Generator);
