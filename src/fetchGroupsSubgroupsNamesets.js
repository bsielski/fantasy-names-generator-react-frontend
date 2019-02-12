import {buildUrlForGroupsSubgroupsNamesets} from './buildUrlForGroupsSubgroupsNamesets';

export function fetchGroupsSubgroupsNamesets(buildUrl = buildUrlForGroupsSubgroupsNamesets) {
    const segregatedByNested = (array, key1, key2) => {
	const sorted = {};
	array.forEach(element => {
            if( sorted[element[key1][key2]] === undefined ){
		sorted[element[key1][key2]] = [];
            }
            sorted[element[key1][key2]].push(element);
	});
	return sorted;
    };
    return fetch(buildUrl())
        .then(response => {
            return response.json();
        })
        .then(response => {
            return {
                groups: response.data,
                subgroups: segregatedByNested(
		    response.included.filter(e => {return (e["type"] === "subgroups");}),
		    "attributes",
		    "group-id"),
                namesets: segregatedByNested(
		    response.included.filter(e => {return (e["type"] === "namesets");}),
		    "attributes",
		    "subgroup-id"),
            };
        })
        .catch(error => console.log(error));
}
