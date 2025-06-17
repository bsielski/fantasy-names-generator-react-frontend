import {curry} from 'ramda';
import {API_SERVER} from './paths';

export const buildUrlsFromNamesetIds = curry(
    (API_SERVER, ids) => {
	const urlPart1 = API_SERVER + "/api/v1/namesets/";
	return ids.map(id => {
	    return urlPart1 + id + "?include=names";
	});
    }
)(API_SERVER);
