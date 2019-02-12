import {curry} from 'ramda';

import {fetchNamesets} from './fetchNamesets';
import {buildNamesetsForGenerator} from './buildNamesetsForGenerator';
import {buildUrlsFromNamesetIds} from './buildUrlsFromNamesetIds';
import {buildRandomNames} from './buildRandomNames';

export const generate = curry(
    async (buildUrlsFromNamesetIds, fetchNamesets, buildNamesetsForGenerator, buildRandomNames, beforeFetchingNamesets, selectedNamesets, afterFetchingNamesets, afterGeneratingNames, howManyNames, namesets) => {

	beforeFetchingNamesets();
	const namesetIds = Array.from(selectedNamesets);
	const urls = buildUrlsFromNamesetIds(namesetIds);
	const promisedFetched = fetchNamesets(urls);
	const fetched = await Promise.all(promisedFetched);
	afterFetchingNamesets();
	const namesetsForGenerator = buildNamesetsForGenerator(fetched, namesets);
	const generated = buildRandomNames(namesetsForGenerator, howManyNames);
	afterGeneratingNames(generated);
    }
)(buildUrlsFromNamesetIds, fetchNamesets, buildNamesetsForGenerator, buildRandomNames);
