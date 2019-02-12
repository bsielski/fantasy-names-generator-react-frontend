import {API_SERVER} from './paths';

export const buildUrlForGroupsSubgroupsNamesets = (API_SERVER = API_SERVER) => {
    return `http://` + API_SERVER + `/api/v1/groups?include=subgroups.namesets`;
};
