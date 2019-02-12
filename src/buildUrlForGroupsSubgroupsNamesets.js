import {API_SERVER} from './paths';

export const buildUrlForGroupsSubgroupsNamesets = (server = API_SERVER) => {
    return `http://` + server + `/api/v1/groups?include=subgroups.namesets`;
};
