import {curry} from 'ramda';

import {fetchNames} from './fetchNames';
import {buildNamesetsForGenerator} from './buildNamesetsForGenerator';
import {buildUrlsFromNamesetIds} from './buildUrlsFromNamesetIds';
import {buildRandomNames} from './buildRandomNames';

export const generate = curry(
    async (buildUrlsFromNamesetIds, fetchNames, buildNamesetsForGenerator, buildRandomNames, beforeFetchingNamesets, selectedNamesets, afterFetchingNamesets, afterGeneratingNames, howManyNames, namesets) => {

	beforeFetchingNamesets();
	const namesetIds = selectedNamesets;
	const urls = buildUrlsFromNamesetIds(namesetIds);
	const promisedFetched = fetchNames(urls);
	const fetched = await Promise.all(promisedFetched);
	afterFetchingNamesets();
	const namesetsForGenerator = buildNamesetsForGenerator(fetched, namesets);
	const generated = buildRandomNames(namesetsForGenerator, howManyNames);
	afterGeneratingNames(generated);
    }
)(buildUrlsFromNamesetIds, fetchNames, buildNamesetsForGenerator, buildRandomNames);
